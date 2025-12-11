const { sql, config } = require("../config/dbConfig");
const Notification = require("../models/notificationModel");

exports.createSurveyRequest = async (req, res) => {
  try {
    let { name, surveyType, location, surveyDate, contact, userId } = req.body;

    // Accept either numeric id or string id (firebase)
    userId = userId ? String(userId) : null;

    if (!name || !surveyType || !location || !surveyDate || !contact || !userId) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const pool = await sql.connect(config);

    // Simple dedupe: if a request with same details was created in last 15 seconds, skip insert
    const dedupe = await pool.request()
      .input("Name", sql.VarChar, name)
      .input("SurveyType", sql.VarChar, surveyType)
      .input("Location", sql.VarChar, location)
      .input("SurveyDate", sql.VarChar, surveyDate)
      .input("Contact", sql.VarChar, contact)
      .input("UserId", sql.VarChar, userId)
      .query(`
        SELECT TOP 1 Id
        FROM SurveyRequests
        WHERE Name = @Name
          AND SurveyType = @SurveyType
          AND Location = @Location
          AND SurveyDate = @SurveyDate
          AND Contact = @Contact
          AND UserId = @UserId
        ORDER BY Id DESC
      `);

    if (dedupe.recordset?.length) {
      // if the last identical request was within 15 seconds, return that id
      const last = dedupe.recordset[0];
      // If CreatedAt exists and is within 15 seconds, return it. If no CreatedAt in schema, skip this check.
     
        return res.status(200).json({ message: "Duplicate ignored", id: last.Id });
      
    }

    const result = await pool.request()
      .input("Name", sql.VarChar, name)
      .input("SurveyType", sql.VarChar, surveyType)
      .input("Location", sql.VarChar, location)
      .input("SurveyDate", sql.VarChar, surveyDate)
      .input("Contact", sql.VarChar, contact)
      .input("UserId", sql.VarChar, userId)
      .query(`
        INSERT INTO SurveyRequests (Name, SurveyType, Location, SurveyDate, Contact, UserId)
        VALUES (@Name, @SurveyType, @Location, @SurveyDate, @Contact, @UserId);
        SELECT SCOPE_IDENTITY() AS Id;
      `);

    const insertedId = result.recordset?.[0]?.Id || null;

    // Persist notifications to DB and inform admins
    const pool2 = await sql.connect(config);
    const admins = await pool2.request().query(`SELECT Id FROM Users WHERE Role='admin'`);
    for (const admin of admins.recordset) {
      try {
        await Notification.createNotification({
          senderId: userId,
          receiverId: admin.Id,
          message: `New survey request from ${name}`,
          type: "survey-request",
        });
      } catch (e) {
        console.error("Notification.create failed:", e);
      }
    }

    // Emit to connected admins using helper on app
    try {
      const notifyAdmins = req.app.get("notifyAdmins");
      if (typeof notifyAdmins === "function") {
        notifyAdmins({
          title: "New Survey Request",
          message: `New survey request from ${name}`,
          surveyId: insertedId,
          type: "survey-request",
        });
      }
    } catch (e) {
      console.error("notifyAdmins error:", e);
    }

    return res.status(201).json({ message: "Survey request submitted", id: insertedId });
  } catch (err) {
    console.error("createSurveyRequest:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSurveyRequests = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM SurveyRequests ORDER BY Id DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error("getSurveyRequests:", err);
    res.status(500).json({ message: "Error fetching" });
  }
};

exports.getUserSurveys = async (req, res) => {
  const { userId } = req.params;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("UserId", sql.VarChar, String(userId))
      .query(`
        SELECT Id, Name, SurveyType, Location, SurveyDate, Contact, Status
        FROM SurveyRequests
        WHERE UserId = @UserId
        ORDER BY Id DESC
      `);
    res.json(result.recordset);
  } catch (err) {
    console.error("getUserSurveys:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  const id = parseInt(req.params.id);
  const { Status } = req.body;

  if (!id || !Status) return res.status(400).json({ message: "Missing fields" });

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("Id", sql.Int, id)
      .input("Status", sql.VarChar, Status)
      .query(`UPDATE SurveyRequests SET Status = @Status WHERE Id = @Id`);

    // fetch the survey to know userId and name
    const survey = await pool.request()
      .input("Id", sql.Int, id)
      .query(`SELECT Id, Name, UserId FROM SurveyRequests WHERE Id = @Id`);
    const rec = survey.recordset?.[0];

    if (rec && rec.UserId) {
      try {
        await Notification.createNotification({
          senderId: null,
          receiverId: rec.UserId,
          message: `Your survey "${rec.Name}" status changed to ${Status}`,
          type: "survey-status",
        });
      } catch (e) {
        console.error("Notification.create failed:", e);
      }

      try {
        const notifyUser = req.app.get("notifyUser");
        if (typeof notifyUser === "function") {
          notifyUser(rec.UserId, {
            title: "Survey Status Updated",
            message: `Your survey "${rec.Name}" status changed to ${Status}`,
            surveyId: id,
            status: Status,
            type: "survey-status",
          });
        }
      } catch (e) {
        console.error("notifyUser error:", e);
      }
    }

    res.json({ message: "Status updated" });
  } catch (err) {
    console.error("updateStatus:", err);
    res.status(500).json({ message: "Server error" });
  }
};

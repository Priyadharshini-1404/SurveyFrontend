// src/screens/Survey/SurveyStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import all your survey pages
import SurveyScreen from "../screens/Survey/SurveyMain";
import PropertySurveyScreen from "../screens/Survey/SurveyPages/Property";
import GuidelineSurveyScreen from "../screens/Survey/SurveyPages/Guideline";
import LandSurveyScreen from "../screens/Survey/SurveyPages/Land";
import BuildingSurveyScreen from "../screens/Survey/SurveyPages/Building";
import BoundarySurveyScreen from "../screens/Survey/SurveyPages/Boundary";
import TopographicalSurveyScreen from "../screens/Survey/SurveyPages/Topological";
import RoadSurveyScreen from "../screens/Survey/SurveyPages/RoadBridge";
import PipelineSurveyScreen from "../screens/Survey/SurveyPages/Pipeline";
import AirportSurveyScreen from "../screens/Survey/SurveyPages/Airport";
import LevelingSurveyScreen from "../screens/Survey/SurveyPages/Leveling";
import PropertyPartitionScreen from "../screens/Survey/SurveyPages/PropertyPartition";
import ContourSurveyScreen from "../screens/Survey/SurveyPages/Contour";
import BuildingSettingsScreen from "../screens/Survey/SurveyPages/BuildingSetting";
import LayoutDesignScreen from "../screens/Survey/SurveyPages/Layoutdesign";
import LayoutSurveyScreen from "../screens/Survey/SurveyPages/Layout";

const Stack = createNativeStackNavigator();

export default function SurveyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SurveyMain"
        component={SurveyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PropertySurvey"
        component={PropertySurveyScreen}
        options={{ title: "Property Survey" }}
      />
      <Stack.Screen
        name="GuidelineSurvey"
        component={GuidelineSurveyScreen}
        options={{ title: "Guideline Survey" }}
      />
      <Stack.Screen
        name="LandSurvey"
        component={LandSurveyScreen}
        options={{ title: "Land Survey" }}
      />
      <Stack.Screen
        name="BuildingSurvey"
        component={BuildingSurveyScreen}
        options={{ title: "Building Survey" }}
      />
      <Stack.Screen
        name="BoundarySurvey"
        component={BoundarySurveyScreen}
        options={{ title: "Boundary Survey" }}
      />
      <Stack.Screen
        name="TopographicalSurvey"
        component={TopographicalSurveyScreen}
        options={{ title: "Topographical Survey" }}
      />
      <Stack.Screen
        name="RoadSurvey"
        component={RoadSurveyScreen}
        options={{ title: "Road and Bridge Survey" }}
      />
      <Stack.Screen
        name="PipelineSurvey"
        component={PipelineSurveyScreen}
        options={{ title: "Pipeline Survey" }}
      />
      <Stack.Screen
        name="AirportSurvey"
        component={AirportSurveyScreen}
        options={{ title: "Airport Survey" }}
      />
      <Stack.Screen
        name="LevelingSurvey"
        component={LevelingSurveyScreen}
        options={{ title: "Leveling Survey" }}
      />
      <Stack.Screen
        name="PropertyPartition"
        component={PropertyPartitionScreen}
        options={{ title: "Property Partition" }}
      />
      <Stack.Screen
        name="ContourSurvey"
        component={ContourSurveyScreen}
        options={{ title: "Contour Survey" }}
      />
      <Stack.Screen
        name="BuildingSettings"
        component={BuildingSettingsScreen}
        options={{ title: "Building Settings" }}
      />
      <Stack.Screen
        name="Layoutdesign"
        component={LayoutDesignScreen}
        options={{ title: "Layout Design" }}
      />
      <Stack.Screen
        name="LayoutSurvey"
        component={LayoutSurveyScreen}
        options={{ title: "Layout Survey" }}
      />
    </Stack.Navigator>
  );
}

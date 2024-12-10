// import MatterportViewer from "@/components/matterport/MatterportViewer";
// import { fetchModels } from "@/services/matterportService/matterportService";
// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";

// const App = () => {
//   const [modelId, setModelId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadModels = async () => {
//       const models = await fetchModels();
//       console.log("models", models);
//       if (models) {
//         setModelId(models.results[0].id); // Lấy ID mô hình đầu tiên
//         console.log("modelsID", models.results[0].id);
//       }
//       setLoading(false);
//     };
//     loadModels();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return modelId ? <MatterportViewer modelId={modelId} /> : null;
// };

// export default App;

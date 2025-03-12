import React, { useState, useMemo ,useEffect} from "react";
import { StyledRoot } from "../components/GlobalStyledComponents/GlobalStyledComponents";
//import useSnackbar from "../custom-hooks/useSnackbar";
//import { getConfiguratorDataSettings } from "../service/nms-service";

export const NmsContext = React.createContext();

const NMSContextProvider = ({ children }) => {
    const [diagramId, setDiagramId] = useState("6c0675eb-fe92-4b05-95be-26821b750ef0");
    const [resizable, setResizable] = useState(false);
    const [showAxisValues, setShowAxisValues] = useState(false);
    const [showCreateRoute, setShowCreateRoute] = useState(false);
    const [showSavedRoute, setShowSavedRoute] = useState(false);
    const [selectedNodeType, setSelectedNodeType] = useState("");
    const [sourceHandles, setSourceHandles] = useState("");
    const [selectedNodeId, setSelectedNodeId] = useState("");
    const [originalDimensions, setOriginalDimensions] = useState({ width: 344, height: 4}); 
    const [loopDimensions, setLoopDimensions] = useState({ width: 150, height:4 });
    const [cancelNode, setCancelNode] = useState(false);
    //const { openSnackbar, SnackbarComponent } = useSnackbar();
    const [sourceNodeId, setSourceNodeId] = useState(null);
    const [locoMovementState, setLocoMovementState] = useState({ stations: [], locos: [], displayFields: [] });
    const [tsrState, setTsrState] = useState({ stations: [] });
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [handleDoubleclick,setHandleDoubleclick] = useState(true);
    const [goToNeighborStation, setGoToNeighborStation] = useState(true);
    const [stationID,setStationID] = useState(null)
    const [neighbourStationID,setNeighbourStationID] = useState(null);
    const [extraHandles, setExtraHandles] = useState([]);
  
    // New color state
    const [trackColor, setTrackColor] = useState("");
    const [trackWidth,setTrackWidth] = useState();
    const[trackHeight,setTrackHeight] = useState();
    const[fontSize,setFontSize]= useState();
    const[stationColor,setStationColor]= useState("green");
    const[canvasTheme,setCanvasTheme] = useState();
    const[trackingCanvasTheme,setTrackingCanvasTheme] = useState();
    const[fontFamily,setFontFamily] = useState();
    const [trackingTrackColor, setTrackingTrackColor] = useState("");
    const [routeData,setRouteData] = useState([]);
    const [routelistofSingleRoute,setRoutelistofSingleRoute] = useState([]);
    const [selectedRouteofSingleStation,setSelectedRouteofSingleStation] = useState([])
    const [configuratorSettings, setConfiguratorSettings] = useState({
        configuratorSettings: {
          canvas_background_colour: "", 
          track_colour: "", 
          station_name_font_size: "", 
          track_thickness: "",
          station_name_font_colour: "", 
          station_name_font_family: "" 
        },
        trackSettings: {
            canvas_background_colour: "",
            station_name_font_colour: "",
            station_name_font_size: "",
            station_name_font_family: "",
            track_colour: "",
            tin_relay_picks_up: "",
            train_engine_colour: "",
            train_colour: "",
            points_colour:"",
            signalPost_Colour:"",
            shuntSignal_Color:"",
            lcGate_Color:""
        },
        graphsSettings:{
            show_gridLine_xaxis:"",
            show_gridLine_yaxis:"",
            grid_lineOpacity_xaxis:"",
            grid_lineOpacity_yaxis:"",
            grid_lineColor_xaxis:"",
            grid_lineColor_yaxis:"",
            grid_lineThickness_xaxis:"",
            grid_lineThickness_yaxis:"",
            coordinate_textColor_xaxis:"",
            coordinate_textColor_yaxis:"",
            coordinates_fontSize_xaxis:"",
            coordinates_fontSize_yaxis:"",
            show_curve_nominal:"",
            show_curve_reverse:"",
            curveColor_nominal:"",
            curveColor_reverse:"",
            curveThickness_nominal:"",
            curveThickness_reverse:"",
            showShadow_nominal:"",
            showShadow_reverse:"",
            show_stationRanges:"",
            show_gradiant:"",
            show_shadow:"",
            stationRange_height:"",
            station_radiusX:"",
            station_radiusY:"",
            show_modeRanges_nominal:"",
            show_modeRanges_reverse:"",
            show_gradiant_nominal:"",
            show_gradiant_reverse:"",
            show_shadow_modeRange_nominal:"",
            show_shadow_modeRange_reverse:"",
            modeRange_height_nominal:"",
            modeRange_height_reverse:"",
            modeRange_radiusX_nominal:"",
            modeRange_radiusX_riverse:"",
            modeRange_radiusY_nominal:"",
            modeRange_radiusY_riverse:""
        }
      });
    const [configuratorSettingsUpdated,setConfiguratorSettingsUpdated] = useState(false);
    const [trackSettings, setTrackSettings] = useState({});
    // const [isPageLoad,setIsPageLoaded] = useState(false);
    
    

    const setDiagram = (id) => {
        setDiagramId(id);
    };

    const setSidebar = (state) => {
        setSideBarOpen(state);
    };

    const handleLocoMovementState = (type, values) => {
        setLocoMovementState((prevState) => ({ ...prevState, [type]: values }));
    };

    const handleTsrReportState = (type, values) => {
        setTsrState((prevState) => ({ ...prevState, [type]: values }));
    };

    // Method to reset dimensions
    const resetDimensions = () => {
        setOriginalDimensions({ width: 344, height: 3, minWidth: 344 });
        setLoopDimensions({ width: 150, height: 3, minWidth: 150 });
    };

    const setSourceHandle = (handleId) => {
        setSourceHandles((prev) => ({
            ...prev,
            [handleId]: true,
        }));
    };

    const unsetSourceHandle = (handleId) => {
        setSourceHandles((prev) => {
            const updated = { ...prev };
            delete updated[handleId];
            return updated;
        });
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await getConfiguratorDataSettings();
    //             if (response.length > 0) {
                    
    //                 setConfiguratorSettings(response[0]); 

    //             }
               
    //         } catch (error) {
    //             console.error("Error fetching API data:", error);
    //         }
    //     };
    
    //     fetchData();
    // }, [configuratorSettingsUpdated]);

 const contextValue = useMemo(() => ({
        showAxisValues, 
        setShowAxisValues,
        showCreateRoute,
        setShowCreateRoute,
        showSavedRoute,
        setShowSavedRoute,
        diagramId,
        setDiagram,
        setSidebar,
        sidebarOpen,
        handleLocoMovementState,
        locoMovementState,
        handleTsrReportState,
        tsrState,
        //openSnackbar,
        sourceNodeId,
        setSourceNodeId,
        resizable,
        setResizable,
        selectedNodeType,
        setSelectedNodeType,
        sourceHandles,
        setSourceHandles,
        setSourceHandle,
        originalDimensions,
        setOriginalDimensions,
        goToNeighborStation,
        setGoToNeighborStation,
        loopDimensions,
        setLoopDimensions,
        resetDimensions,
        cancelNode,
        unsetSourceHandle,
        selectedNodeId,
        setSelectedNodeId,
        showSaveButton,
        setShowSaveButton,
        setCancelNode,
        // New color context values
        trackColor,
        setTrackColor,
        trackHeight,
        setTrackHeight,
        trackWidth,
        setTrackWidth,
        fontSize,
        setFontSize,
        stationColor,
        setStationColor,
        canvasTheme,
        setCanvasTheme,
        fontFamily,
        setFontFamily,
        trackingCanvasTheme,
        setTrackingCanvasTheme,
        trackingTrackColor,
        setTrackingTrackColor,
        configuratorSettings,
        setConfiguratorSettings,
        configuratorSettingsUpdated,
        setConfiguratorSettingsUpdated,
        trackSettings,
        setTrackSettings,
        handleDoubleclick,
        setHandleDoubleclick,
        stationID, setStationID,
        neighbourStationID,
        setNeighbourStationID,routeData,setRouteData,extraHandles, setExtraHandles,
        routelistofSingleRoute,
        setRoutelistofSingleRoute,selectedRouteofSingleStation,setSelectedRouteofSingleStation,
    }), [
        showAxisValues, 
        setShowAxisValues,
        showCreateRoute, 
        setShowCreateRoute,
        diagramId,
        sidebarOpen,
        locoMovementState,
        tsrState,
        sourceHandles,
        selectedNodeId,
        resizable,
        selectedNodeType,
        originalDimensions,
        loopDimensions,
        cancelNode,
        trackColor,
        trackHeight,
        trackWidth,
        fontSize,
        stationColor,
        canvasTheme,
        fontFamily, 
        trackingCanvasTheme,
        trackingTrackColor,
        configuratorSettings,
        configuratorSettingsUpdated,
        trackSettings,
        handleDoubleclick,
        setHandleDoubleclick,
        stationID,
        setStationID,
        neighbourStationID,
        setNeighbourStationID,
        goToNeighborStation,
        setGoToNeighborStation,routeData,setRouteData,extraHandles, setExtraHandles,
        routelistofSingleRoute,setRoutelistofSingleRoute,
        showSavedRoute,
        setShowSavedRoute,selectedRouteofSingleStation,setSelectedRouteofSingleStation
    ]);

    return (
        <NmsContext.Provider value={contextValue}>
            {/* <StyledRoot> */}
            {children}
            {/* </StyledRoot> */}
            {/* <SnackbarComponent /> */}
        </NmsContext.Provider>
    );
};

export default NMSContextProvider;

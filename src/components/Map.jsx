import React, { useState } from "react";
import axios from "axios"
import { geoCentroid } from "d3-geo";
import { useNavigate } from "react-router-dom";
// Chakra UI imports
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
// React Simple Maps imports
import {
  ComposableMap, //map container
  Geographies, //json of all countries
  Geography, //each country object
  Marker, //method to create a marker
  Annotation, // method to create an annotation
} from "react-simple-maps";

import allStates from "../allstates.json";

const geoURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

//offsets arrays are x-axis and y-axis situated
//ex: 50 px to the right, 8 pixels down
const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const Map = () => {
  const [state, setStates] = useState([]);
  const [clickedGeo, setClickedGeo] = useState(null);
  const [displayPopover, setDisplayPopover] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 300 });
  const [addStateData, setAddStateData] =
useState({});  const navigate = useNavigate();


  // Function to handle clicks; The name of the state that was clicked as well as the click event are passed in.  cconst handleStateClick = (stateName, e) => {
    // Make request to server.js
    const fetchAddStateData = async () => {
        try {
            // Make the specific request to server.js -> apiRouter
            const response = await axios.get(`/map/api/${stateName.toLowerCase()}`);
            // Update addStateData (additional state data) state with fetched data from API
            setAddStateData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Retrieve user information from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // If the click event that occurred happened while 'shift' is held down
    if (e.shiftKey) {
        e.preventDefault();
        console.log('shift click working');
        // Update state with the name of the state that was clicked (i.e. Utah)
        setClickedGeo(stateName);
        // Run the 'fetchAddStateData' function to make the GET request to server.js
        fetchAddStateData();
        // Update DisplayPopover state to let the Popover component (Chakra UI) below know to render
        setDisplayPopover(true);
        // Update the PopoverPosition state to let the Popover component know where on the page to render (still have to update this to reflect the position of the state that was clicked on)
        setPopoverPosition({ x: e.clientX, y: e.clientY });
    } else {
        if (storedUser) {
            // Check if the clicked state is already in the user's locations array
            if (storedUser.locations.includes(stateName)) {
                // Remove the clicked state from the user's locations array
                storedUser.locations = storedUser.locations.filter((state) => state !== stateName);
                console.log("State removed from user's locations array");
            } else {
                // Add the clicked state to the user's locations array
                storedUser.locations.push(stateName);
            }

            // Store the updated user information back in local storage
            localStorage.setItem('user', JSON.stringify(storedUser));
        } else {
            console.error('User not found in local storage');
        }
    }
    // Sends user back to login page
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      className="App"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "cream",
      }}
    >
      <h1>Let's track our travels!</h1>

      {/* component to render map */}

      <div style={{ width: "1400px", borderStyle: "double" }}>
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoURL}>
            {({ geographies }) => (
              <>
                {/* this first geographies.map creates the individual state elements */}
                {geographies.map((geo) => (
                  <React.Fragment key={geo.rsmKey}>
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={(e) => {
                        console.log(geo.properties.name, "clicked!");
                        setStates(geo.properties.name);
                        handleStateClick(geo.properties.name, e);
                      }}
                      style={{
                        default: {
                          fill: JSON.parse(
                            localStorage.getItem("user")
                          )?.locations.includes(geo.properties.name)
                            ? "#65A5B8"
                            : "#F3EBE2",
                          stroke: "green",
                        },
                        hover: { fill: "#0081B8", outline: "#505168" },
                        pressed: { fill: "#65A5B8", outline: "#65A5B8" },
                      }}
                    />
                  </React.Fragment>
                ))}
                {/* this second geographies.map adds the labels to the state elements. States either get a marker(aka label) or an annotation */}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const cur = allStates.find((s) => s.val === geo.id);
                  return (
                    <g key={geo.rsmKey + "-name"}>
                      {cur &&
                        centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                          <Marker coordinates={centroid}>
                            <text y="2" fontSize={14} textAnchor="middle">
                              {cur.id}
                            </text>
                          </Marker>
                        ) : (
                          <Annotation
                            subject={centroid}
                            dx={offsets[cur.id][0]}
                            dy={offsets[cur.id][1]}
                          >
                            <text
                              x={4}
                              fontSize={14}
                              alignmentBaseline="middle"
                            >
                              {cur.id}
                            </text>
                          </Annotation>
                        ))}
                    </g>
                  );
                })}
              </>
            )}
          </Geographies>
        </ComposableMap>

        {/* Render popover if a geography is shift-clicked */}
        {displayPopover && (
          <Popover
            isOpen={true}
            onClose={() => setDisplayPopover(null)}
            position="absolute"
            left={popoverPosition.x}
            top={popoverPosition.y}
          >
            <PopoverTrigger>
              <Button>TRIGGER</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader><b>{clickedGeo}</b></PopoverHeader>
              <PopoverBody>
                <div>Population:</div>
                <div>Area:</div>
                <div>Photos:</div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <Button
        borderRadius="9px"
        type="submit"
        variant="solid"
        marginBottom="15px"
        colorScheme="brand"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Map;

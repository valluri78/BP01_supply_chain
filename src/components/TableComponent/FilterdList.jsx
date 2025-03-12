import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  makeStyles,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import styled from "styled-components";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useNavigate } from "react-router-dom";

const StyledTableContainer = styled(TableContainer)`
  &.MuiTableContainer-root {
    height: 337px;
    overflow-x: auto;
    display: grid;
    width: 100%;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #ffff;
    }
    &::-webkit-scrollbar-thumb {
      background: grey;
      border-radius: 3px;
    }
  }
`;

const StyledTableCell = styled(TableCell)`
  &.MuiTableCell-root {
    background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
    cursor: ${({ cursor }) => cursor || "pointer"};
    white-space: nowrap;
    height: 50px
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
  margin-top: ${({ marginTop }) => marginTop || 0}px;
`;


const StickyActionsCellContent = styled(TableCell)`
  &.MuiTableCell-root {
    position: sticky;
    right: 0;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
    text-align: end;
    padding: 0px;
    background-color: #fff;
    min-width:100px;
    padding-right: ${({ paddingRight }) => paddingRight || 0}px;
  }
`;

const useStyles = makeStyles(() => ({
  deleteIcon: {
    color: "#eb5e34",
    fontSize: "20px",
  },
  editIcon: {
    color: "#C58D40",
    fontSize: "20px",
  },
  typography: {
    marginLeft: 10,
    fontSize: 15,
  },
}));

const FilterdList = ({
  src,
  headers,
  data = [],
  onOpenMenuActions,
  anchorEl,
  onCloseMenuActions,
  onEdit,
  onDelete,
  onSort,
  sortDirection,
  onHyperLinkCallback1,
  onHyperLinkCallback2,
  onHyperLinkCallback3,
  source,
}) => {
  const classes = useStyles();

  const MIN_ROWS = 5;
  const emptyRows = Math.max(0, MIN_ROWS - data.length);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);

  const handleSort = (id) => {
    setSortedColumn(id);
    setActiveColumn(id);
    onSort(id);
  };
  // Left Sticky Columns Dynamic Position Left Cal
  const headerRefs = useRef([]);
  const [leftOffsets, setLeftOffsets] = useState([]);

  const isStationId = headers.some((header) => header.id === "stationId" || header.id === "stationName" || header.id === "stationCode");

  // Left Sticky Columns Dynamic Position Left Cal
  useEffect(() => {
    const offsets = [];
    let cumulativeWidth = 0;
    headers.forEach((header, index) => {
      const width = headerRefs.current[index]?.offsetWidth || 0;
      // Add custom adjustments for specific columns based on index or header.id
      let adjustedOffset = cumulativeWidth;
      // Example of specific adjustments for gaps
      if (header.id === "stationId") {
        adjustedOffset -= 0; // Slight shift for this column
      } else if (header.id === "stationName") {
        adjustedOffset -= 0; // Another slight shift
      } else if (header.id === "stationCode") {
        adjustedOffset -= 0.1; // Fine-tune as needed
      }
      offsets.push(adjustedOffset);
      cumulativeWidth += width;
    });
    setLeftOffsets(offsets);
  }, [headers, data]);
    const navigate = useNavigate();

  return (
    <StyledTableContainer isStationId={isStationId} style={{ height: MIN_ROWS === 5 ? "320px" : "337px" }}>
      <Table stickyHeader aria-label="sticky table" className="stickyTable" style={{ tableLayout: "auto" }}>
        <TableHead>
          <TableRow>
            {headers.map((header, colIndex) => (
              <TableCell
                ref={(el) => (headerRefs.current[colIndex] = el)}
                key={header.id}
                align="left"
                width={header.minWidth}
                onClick={() => header.sort && handleSort(header.id)}
                className="tableHeader"
                style={{
                  position: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? "sticky" : undefined,
                  left: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? `${leftOffsets[colIndex]}px` : undefined,
                  // position: (header.id === "stationId" || header.id === "stationName" || header.id === "stationCode") ? "sticky" : undefined,
                  // left: header.id === "stationId" ? 0.5 : header.id === "stationName" ? 62.5 : header.id === "stationCode" ? 164.5 : undefined,
                  zIndex: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? 9 : undefined,
                  boxShadow: (src === "station" && header.id === "stationCode") ? "0.4px 0px 0px 0px rgba(0, 0, 0, 0.2)" : undefined,
                  whiteSpace: "nowrap",
                  textAlign: (header?.numberTextEnd === true && "right"),
                  borderRight:((src === "station" && header.id === "stationCode")) ? "0.25px 0px 0px rgba(0, 0, 0, 0.02)" : undefined, 
                }}
              >
                {header.sort ? (
                  <>
                    {header.value}
                    <TableSortLabel direction={sortDirection === "ASC" ? "asc" : "desc"} hideSortIcon={true}
                      onClick={() => setIsClicked(!isClicked)}
                    >
                      {sortedColumn === header.id && sortDirection === "ASC" ? (
                        <ArrowUpwardIcon style={{ fontSize: "16px", color: activeColumn === header.id ? "black" : "grey" }} />
                      ) : (
                        <ArrowDownwardIcon style={{ fontSize: "16px", color: activeColumn === header.id ? "black" : "grey" }} />
                      )}
                    </TableSortLabel>
                  </>
                ) : (
                  <>{header.value}</>
                )}
              </TableCell>
            ))}
            <StickyActionsCellContent align="left" paddingRight={16} className="tableHeader">
              Actions
            </StickyActionsCellContent>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody">
          {data?.length > 0 ? (
            <>
              {data.map((item, index) => (
                <TableRow key={item.slNo}>
                  {headers.map((header, colIndex) => (
                    <TableCell
                      key={header.id}
                      cursor="default"
                      className="tableBodyText"
                      align={header.justifyContent === "right" ? "right" : "left"}
                      style={{
                        color: header.id === "portStatus" && item[header.id] === "Active" && "green" ||
                          header.id === "portStatus" && item[header.id] === "Inactive" && "red" ||
                          (header.id === "activeStatus" || header.id === "smsStatus") && item[header.id] === "Active" && "green" ||
                          (header.id === "activeStatus" || header.id === "smsStatus") && item[header.id] === "Inactive" && "red" ||
                          header.id === "isActive" && item[header.id] === "Active" && "green" ||
                          header.id === "isActive" && item[header.id] === "Inactive" && "red" ||
                          header.id === "isActive" && item[header.id] === "Yes" && "green" ||
                          header.id === "isActive" && item[header.id] === "No" && "red" ||
                          header.id === "isBlock" && item[header.id] === "Yes" && "green" ||
                          header.id === "isBlock" && item[header.id] === "No" && "red" ||
                          header.id === "isStation" && item[header.id] === "Yes" && "green" ||
                          header.id === "isStation" && item[header.id] === "No" && "red",
                        position: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? "sticky" : undefined,
                        left: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? `${leftOffsets[colIndex]}px` : undefined,
                        // position: (header.id === "stationId" || header.id === "stationName" || header.id === "stationCode") ? "sticky" : undefined,
                        // left: header.id === "stationId" ? 0.5 : header.id === "stationName" ? 62.5 : header.id === "stationCode" ? 164.5 : undefined,
                        boxShadow: (src === "station" && header.id === "stationCode") ? "0.4px 0px 0px 0px rgba(0, 0, 0, 0.2)" : undefined,
                        backgroundColor: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? "#fff" : undefined,
                        whiteSpace: "nowrap",
                        borderRight:((src === "station" && header.id === "stationCode")) ? "0.25px 0px 0px rgba(0, 0, 0, 0.02)" : undefined
                      }}
                    >

                          {item[header.id]}
                        
                      
                    </TableCell>
                  ))}
                  <StickyActionsCellContent>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <StyledIconButton
                        onClick={() => {
                          onEdit(item.slNo);
                        }}
                      >
                        <Edit className={classes.editIcon} />
                      </StyledIconButton>
                      <StyledIconButton
                        onClick={() => onDelete(item.slNo)}
                      >
                        <Delete className={classes.deleteIcon} />
                      </StyledIconButton>

                    </div>
                    {/* <Grid container spacing={1} justifyContent="flex-end">
                      <Grid item>
                        <StyledIconButton
                          onClick={() => {
                            onEdit(item.slNo);
                          }}
                        >
                          <Edit className={classes.editIcon} />
                        </StyledIconButton>
                      </Grid>
                      <Grid item style={{ paddingRight: "8px" }}>
                        <StyledIconButton
                          onClick={() => onDelete(item.slNo)}
                        >
                          <Delete className={classes.deleteIcon} />
                        </StyledIconButton>
                      </Grid>
                    </Grid> */}

                  </StickyActionsCellContent>
                </TableRow>
              ))}

              {Array.from({ length: emptyRows }).map((_, index) => (
                <TableRow key={`empty-${index}`}>
                  {headers.map((header) => (
                    <StyledTableCell
                      style={{
                        position: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? "sticky" : undefined,
                        left: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? `${leftOffsets[headers.findIndex((h) => h.id === header.id)]}px` : undefined,
                        // position: (header.id === "stationId" || header.id === "stationName" || header.id === "stationCode") ? "sticky" : undefined,
                        // left: header.id === "stationId" ? 0.5 : header.id === "stationName" ? 62.5 : header.id === "stationCode" ? 164.5 : undefined,
                        boxShadow: (src === "station" && header.id === "stationCode") ? "0.4px 0px 0px 0px rgba(0, 0, 0, 0.2)" : undefined,
                        backgroundColor: ((src === "station" && header.id === "stationId") || (src === "station" && header.id === "stationName") || (src === "station" && header.id === "stationCode")) ? "#fff" : undefined,
                      }}
                      key={header.id} cursor="default">

                    </StyledTableCell>
                  ))}
                  <StickyActionsCellContent>

                  </StickyActionsCellContent>
                </TableRow>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: MIN_ROWS }).map((_, index) => (
                <TableRow key={`empty-${index}`}>
                  {headers.map((header) => (
                    <StyledTableCell key={header.id} cursor="default">

                    </StyledTableCell>
                  ))}
                  <StickyActionsCellContent>
                  </StickyActionsCellContent>
                </TableRow>
              ))}
              <TableRow>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default FilterdList;
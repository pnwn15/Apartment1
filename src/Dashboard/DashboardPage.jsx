import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // สำหรับการนำทางไปยังหน้าต่าง ๆ
import {
  Grid,
  InputAdornment,
  IconButton,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Checkbox,
  Collapse,
  MenuItem,
  Menu,
  FormControlLabel,
} from "@mui/material";
import CardComponent from "./CardComponent";
import roomData from "./roomData.json";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { FlashOn, Opacity, Power } from "@mui/icons-material"; // ไอคอนที่ใช้

function DashboardPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [roomStats, setRoomStats] = useState({
    occupancyRate: 0,
    reservedRooms: 0,
    overdueRooms: 0,
    availableRooms: 0,
  });
  const [filteredRooms, setFilteredRooms] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCardClick = (roomNumber) => {
    navigate(`/room/${roomNumber}`); // เปลี่ยนเส้นทางไปที่หน้ารายละเอียดห้อง
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectFloor = (floor) => {
    setSelectedFloor(floor);
    handleClose();
    if (floor === 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    // Filter rooms by selected floor
    const filtered = roomData.filter(
      (room) => floor === "" || room.floor === floor
    );
    setFilteredRooms(filtered);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    // Filter rooms by search value
    const filtered = roomData.filter(
      (room) =>
        room.roomNumber.toString().includes(value) &&
        (selectedFloor === "" || room.floor === selectedFloor)
    );
    setFilteredRooms(filtered);
  };

  const handleSearchClick = () => {
    console.log("ค้นหาหมายเลขห้อง:", searchValue);
  };

  useEffect(() => {
    const totalRooms = roomData.length;
    const reservedRooms = roomData.filter(
      (room) => room.statusText === "ห้องจอง"
    ).length;
    const overdueRooms = roomData.filter(
      (room) => room.statusText === "ค้างชำระ"
    ).length;
    const availableRooms = roomData.filter(
      (room) => room.statusText === "ห้องว่าง"
    ).length;
    const occupancyRate = ((reservedRooms + availableRooms) / totalRooms) * 100;

    setRoomStats({
      occupancyRate: occupancyRate.toFixed(2),
      reservedRooms,
      overdueRooms,
      availableRooms,
    });

    // Initialize filtered rooms with all rooms
    setFilteredRooms(roomData);
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center" direction="column">
      <Grid item xs={12} md={12} lg={12}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%" // กำหนดให้ Box กว้างเต็มหน้าจอ
        >
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            สถานะห้อง
          </Typography>
          <Box width="100%">
            {" "}
            {/* ใช้ width 100% เพื่อให้ CardComponent เต็มความกว้าง */}
            <CardComponent
              occupancyRate={roomStats.occupancyRate}
              reservedRooms={roomStats.reservedRooms}
              overdueRooms={roomStats.overdueRooms}
              availableRooms={roomStats.availableRooms}
            />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={10} lg={12}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={4}>
                <Typography
                  variant="h3"
                  component="div"
                  align="center"
                  sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
                >
                  ผังห้อง
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                gap={3}
                mb={4}
              >
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  gap={2}
                  width={{ xs: "100%", sm: "auto" }}
                >
                  <Button
                    variant="outlined"
                    fullWidth={{ xs: true, sm: false }}
                    startIcon={<FilterListIcon />}
                    onClick={handleToggle}
                    sx={{
                      minWidth: 120,
                      py: 1.5,
                    }}
                  >
                    ฟิลเตอร์ห้อง
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth={{ xs: true, sm: false }}
                    startIcon={<FilterListIcon />}
                    sx={{
                      minWidth: 120,
                      py: 1.5,
                      fontSize: "16px",
                      fontWeight: "500",
                      borderRadius: "8px",
                      borderColor: "#1976d2",
                      "&:hover": {
                        borderColor: "#1565c0",
                        backgroundColor: "#e3f2fd",
                      },
                    }}
                    onClick={handleClick}
                  >
                    {selectedFloor ? `ชั้น ${selectedFloor}` : "เลือกชั้น"}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        width: 100,
                      },
                    }}
                  >
                    {[1, 2, 3, 4].map((floor) => (
                      <MenuItem
                        key={floor}
                        onClick={() => handleSelectFloor(floor)}
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          padding: "8px 16px",
                          "&:hover": {
                            backgroundColor: "#e3f2fd",
                            borderRadius: "6px",
                          },
                          transition: "background-color 0.2s",
                        }}
                      >
                        ชั้น {floor}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                <TextField
                  label="ค้นหาหมายเลขห้อง"
                  variant="outlined"
                  size="small"
                  value={searchValue}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: { xs: "100%", sm: 300 },
                  }}
                />
              </Box>

              <Collapse in={open} timeout="auto" unmountOnExit sx={{ mb: 3 }}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "medium" }}
                    >
                      ตัวเลือกฟิลเตอร์
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label="อัตราการเข้าพัก"
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label="ห้องจอง"
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label="ค้างชำระ"
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label="ห้องว่าง"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Collapse>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid>
        <Box>
          <CardContent>
            {selectedFloor && (
              <Card
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 3, // เพิ่มเงาให้กับการ์ด
                  borderRadius: 2, // เพิ่มความมนให้กับขอบ
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#1976d2", // ใช้สีหลัก
                    }}
                  >
                    ห้องพักชั้น {selectedFloor}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      textAlign: "center",
                      color: "#616161", // สีข้อความเพิ่มเติม
                    }}
                  >
                    รายละเอียดห้องพักทั้งหมดในชั้น {selectedFloor}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        textAlign: "center",
                        color: "#388e3c", // ใช้สีสำหรับหัวข้อรายการ
                      }}
                    >
                      รายการห้อง (
                      {
                        filteredRooms.filter(
                          (room) => room.floor === selectedFloor
                        ).length
                      }{" "}
                      ห้อง)
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                      {filteredRooms.filter(
                        (room) => room.floor === selectedFloor
                      ).length > 0 ? (
                        filteredRooms
                          .filter((room) => room.floor === selectedFloor)
                          .map((room) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              key={room.roomNumber}
                            >
                              <Card
                                onClick={() => handleCardClick(room.roomNumber)}
                                className="cursor-pointer border-2 border-gray-300 hover:shadow-lg transition-shadow duration-300"
                              >
                                <CardContent className="text-center p-3">
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    className="font-bold"
                                  >
                                    ห้อง {room.roomNumber}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    className={`font-bold ${
                                      room.statusText === "ห้องจอง"
                                        ? "text-yellow-600"
                                        : room.statusText === "ค้างชำระ"
                                        ? "text-red-600"
                                        : room.statusText === "ห้องว่าง"
                                        ? "text-green-600"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    สถานะ: {room.statusText}
                                  </Typography>
                                  {room.tenant && (
                                    <Typography variant="body2" className="mt-1">
                                      ผู้เช่า: {room.tenant}
                                    </Typography>
                                  )}
                                  {/* ค่าไฟ */}
                                  <Typography
                                    variant="body2"
                                    className="mt-1 flex justify-center items-center"
                                  >
                                    <Power className="mr-1 text-yellow-500" />
                                    ค่าไฟ: {room.electricity} บาท (
                                    {room.electricity / 5} หน่วย)
                                  </Typography>
                                  {/* ค่าน้ำ */}
                                  <Typography
                                    variant="body2"
                                    className="flex justify-center items-center"
                                  >
                                    <Opacity className="mr-1 text-blue-500" />
                                    ค่าน้ำ: {room.water} บาท (
                                    {room.water / 5} หน่วย)
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))
                      ) : (
                        <Typography variant="body1" sx={{ textAlign: "center" }}>
                          ไม่มีห้องในชั้นนี้
                        </Typography>
                      )}
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DashboardPage;

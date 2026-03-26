import { useEffect, useState  } from "react";
import type { CarData } from "../types";
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddCar from "./AddCar";

function CarList() {
  const [cars, setCars] = useState<CarData[]>([]);

  const columns: GridColDef[] = [
    { field: "brand", width: 200, headerName: "Brand"},
    { field: "model", width: 150, headerName: "Model"},
    { field: "color", headerName: "Color"},
    { field: "fuel", headerName: "Fuel"},
    { field: "modelYear", headerName: "Model year"},
    { field: "price", headerName: "Price (€)"},
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
          DELETE
        </Button>
    }
  ]

  const getCars = () => {
    fetch(import.meta.env.VITE_API_URL +  "/cars")
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching cars");

      return response.json();
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err));
  }

  const handleDelete = (url: string) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, {
        method: "DELETE"
      })
      .then(response => {
        if (!response.ok)
          throw new Error("Error when deleting a car");

        return response.json();
      })
      .then(() => getCars())
      .catch(err => console.error(err))
    }
  }
 
  useEffect(() => {
    getCars();
  }, []);

  return(
    <>
      <Stack sx={{ mt: 2, mb: 2 }} direction="row" >
        <AddCar />
      </Stack>
      <div style={{ width: "95%", height: 500, margin: "auto" }}>
        <DataGrid 
          columns={columns}
          rows={cars}
          getRowId={row => row._links.self.href}
          autoPageSize
          rowSelection={false}
        />
      </div>
    </>
  );
}

export default CarList;
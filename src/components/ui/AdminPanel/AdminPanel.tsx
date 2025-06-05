import { useState, useEffect } from "react";
import Search from "../Search/Search";
import { Icon } from "@iconify/react";
import JEMBar from "../JEMBar/JEMBar";
import LoginBar from "../LoginBar/LoginBar";
import SortFiltersAdmin from "../SortFiltersAdmin/SortFiltersAdmin";
import UserTable from "../User/User";
import ProductTable from "../Product/Product";
import SalesTable from "../SalesTable/SalesTable";

export type Sale = {
  usuario: string;
  fecha: string;
  precio: number;
  estado: "Pendiente" | "En Progreso" | "Completada";
};

// Borrar luego
const usuariosData = [
  { nombre: "Jeronimo Cortez", id: "1122334", mail: "Jeroortez@gmail.com" },
  {
    nombre: "Ezequiel Argentini",
    id: "1222211",
    mail: "ezeargentini@gmail.com",
  },
  { nombre: "Mauro Arzuza", id: "1133671", mail: "Mauroezequiel365@gmail.com" },
  { nombre: "Maxon", id: "1242611", mail: "Maxon@gmail.com" },
  { nombre: "Tonga", id: "1124445", mail: "Tonga@gmail.com" },
  { nombre: "Chivo Neura", id: "1222233", mail: "chivin@gmail.com" },
];

// Borrar luego
const productosData = [
  {
    nombre: "Zapatillas Adidas Campus",
    categoria: "Zapatilla",
    precioVenta: 180000,
    costo: 120000,
    ganancia: 60000,
    stock: 7,
  },
  {
    nombre: "Zapatillas Nike AirForce",
    categoria: "Zapatilla",
    precioVenta: 165000,
    costo: 105000,
    ganancia: 60000,
    stock: 25,
  },
  {
    nombre: "Zapatillas Adidas Grand Court",
    categoria: "Zapatilla",
    precioVenta: 160000,
    costo: 110000,
    ganancia: 50000,
    stock: 14,
  },
  {
    nombre: "Zapatillas Nike Essential",
    categoria: "Zapatilla",
    precioVenta: 205000,
    costo: 135000,
    ganancia: 70000,
    stock: 12,
  },
  {
    nombre: "Campera Deportiva LA Lakers",
    categoria: "Ropa",
    precioVenta: 220000,
    costo: 180000,
    ganancia: 40000,
    stock: 40,
  },
  {
    nombre: "Gorra Nike Chelsea",
    categoria: "Accesorios",
    precioVenta: 65000,
    costo: 25000,
    ganancia: 35000,
    stock: 27,
  },
];

//Borrar Luego
const comprasData: Sale[] = [
  { usuario: "Jeronimo Cortez", fecha: "4/6/25", precio: 123000, estado: "Pendiente" },
  { usuario: "Mauro Arzuza", fecha: "5/12/24", precio: 94500, estado: "En Progreso" },
  { usuario: "Ezequiel Argentini", fecha: "13/4/25", precio: 200000, estado: "Completada" },
];

const AdminPanel = () => {
  const [vista, setVista] = useState<
    "usuarios" | "productos" | "estadisticas" | "compras"
  >("usuarios");
  const userOptions = ["Usuario", "ID", "Mail"];
  const prodOptions = [
    "Categoría",
    "Precio Venta",
    "Costo",
    "Ganancia",
    "Stock",
  ];
  const salesOptions = ["Usuario", "Fecha", "Precio", "Estado"];
  const [options, setOptions] = useState<string[]>(userOptions);
  const [sortKey, setSortKey] = useState<string>(userOptions[0]);

  useEffect(() => {
    if (vista === "usuarios") {
      setOptions(userOptions);
      setSortKey(userOptions[0]);
    } else if (vista === "productos") {
      setOptions(prodOptions);
      setSortKey(prodOptions[0]);
    } else if (vista === "compras") {
      setOptions(salesOptions);
      setSortKey(salesOptions[0]);
    } else {
    }
  }, [vista]);

  return (
    <div>
      <JEMBar />
      <LoginBar />
      <div className="flex items-center justify-center gap-8 py-4 bg-white text-black text-lg mt-4">
        <button
          className={`hover:underline cursor-pointer ${
            vista === "productos" ? "underline" : ""
          }`}
          onClick={() => setVista("productos")}
        >
          Productos
        </button>
        <button
          className={`hover:underline cursor-pointer ${
            vista === "estadisticas" ? "underline" : ""
          }`}
          onClick={() => setVista("estadisticas")}
        >
          Estadísticas
        </button>
        <button
          className={`hover:underline cursor-pointer ${
            vista === "compras" ? "underline" : ""
          }`}
          onClick={() => setVista("compras")}
        >
          Compras
        </button>
        <button
          className={`hover:underline cursor-pointer ${
            vista === "usuarios" ? "underline" : ""
          }`}
          onClick={() => setVista("usuarios")}
        >
          Usuarios
        </button>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center">
          <SortFiltersAdmin
            options={options}
            selected={sortKey}
            onSelect={setSortKey}
          />
          <Search />
        </div>

        <div className="flex justify-center items-center mb-8">
          <button className="flex justify-around items-center bg-green-700 text-white px-6 py-2 rounded-full hover:cursor-pointer">
            Nuevo
            <span className="ml-1">
              <Icon icon="ph:plus-fill" width="24" height="24" />
            </span>
          </button>
        </div>

        {vista === "usuarios" && (
          <UserTable data={usuariosData} sortKey={sortKey} />
        )}
        {vista === "productos" && (
          <ProductTable data={productosData} sortKey={sortKey} />
        )}
        {vista === "compras" && (
          <SalesTable data={comprasData} sortKey={sortKey} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

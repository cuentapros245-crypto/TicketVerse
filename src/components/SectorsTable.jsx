import React from 'react';
import { useParams } from 'react-router-dom';

export default function SectorsTable({ tarifaFiltro, precioBase, seleccionarTarifa, temaAccent }) {
  const { id } = useParams();
  const currentId = String(id);

  const obtenerPreciosPorEvento = () => {
    switch (currentId) {
      case "db-broly": 
        return {
          zonaAccesoName: "SALA PREMIUM",
          zonaCorazonName: "BUTACAS INTERMEDIAS",
          zonaGeneralName: "PRIMERAS FILAS",
          accesoDscto: 14.00, accesoReg: 18.50,
          corazonDscto: 11.00, corazonReg: 15.00, corazonDisc: 9.25,
          generalDscto: 8.00, generalReg: 10.90
        };
      case "1":
        return {
          zonaAccesoName: "ZONA GOLDEN VIP",
          zonaCorazonName: "ZONA VIP INTERMEDIA",
          zonaGeneralName: "ZONA GENERAL",
          accesoDscto: 140.00, accesoReg: 186.00,
          corazonDscto: 93.00, corazonReg: 124.00, corazonDisc: 85.00,
          generalDscto: 54.00, generalReg: 72.00
        };
      case "2": // Tu Nombre y El Mío
        return {
          zonaAccesoName: "PLATINIUM PRESENCIAL",
          zonaCorazonName: "VIP CENTRAL",
          zonaGeneralName: "GENERAL ENTRADA",
          accesoDscto: 120.00, accesoReg: 160.00,
          corazonDscto: 82.50, corazonReg: 110.00, corazonDisc: 75.00,
          generalDscto: 45.00, generalReg: 60.00
        };
      case "3": // Rock Fest 2026
        return {
          zonaAccesoName: "ZONA ROCK STAR (CAMPO A)",
          zonaCorazonName: "ZONA MOX (CAMPO B)",
          zonaGeneralName: "TRIBUNA GENERAL",
          accesoDscto: 100.00, accesoReg: 100.00,
          corazonDscto: 90.00, corazonReg: 110.00, corazonDisc: 95.00,
          generalDscto: 45.00, generalReg: 60.00
        };
      case "4":
        return {
          zonaAccesoName: "PLATEA BAJA CENTRAL", zonaCorazonName: "PLATEA ALTA LATERAL", zonaGeneralName: "PISO 4 GENERAL",
          accesoDscto: 71.00, accesoReg: 95.00,
          corazonDscto: 60.00, corazonReg: 80.00, corazonDisc: 40.00,
          generalDscto: 22.50, generalReg: 30.00
        };
      case "5": 
        return {
          zonaAccesoName: "VIP PRO PASSPORT", zonaCorazonName: "CHAMPION ZONE", zonaGeneralName: "SPECTATOR PASS",
          accesoDscto: 41.25, accesoReg: 55.00,
          corazonDscto: 26.25, corazonReg: 35.00, corazonDisc: 20.00,
          generalDscto: 18.75, generalReg: 25.00
        };
      case "6": 
        return {
          zonaAccesoName: "CAMPO A PLATINIUM",
          zonaCorazonName: "CAMPO B ORIENTE",
          zonaGeneralName: "TRIBUNA NORTE",
          accesoDscto: 596.00, accesoReg: 795.00,
          corazonDscto: 360.00, corazonReg: 480.00, corazonDisc: 290.00,
          generalDscto: 123.75, generalReg: 165.00
        };
      default: 
        return {
          zonaAccesoName: "PRIMER ASIENTO", zonaCorazonName: "CENTRO", zonaGeneralName: "ULTIMO ASIENTO",
          accesoDscto: 10.00, accesoReg: 15.00,
          corazonDscto: 10.00, corazonReg: 13.00, corazonDisc: 7.20,
          generalDscto: 10.00, generalReg: 18.50
        };
    }
  };

  const dataPrecios = obtenerPreciosPorEvento();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 style={{ fontSize: '22px', margin: 0, color: '#ff007f', fontWeight: 'bold' }}>SECTORES DE LA SALA</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        
        {/* Encabezados de Columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1.5fr 1.5fr 1.5fr', gap: '12px', alignItems: 'end', textAlign: 'center', fontSize: '11px', fontWeight: 'bold', paddingBottom: '10px' }}>
          <div></div>
          <div style={{ color: tarifaFiltro === "DSCTO" ? '#39ff14' : '#666' }}>25% DSCTO.</div>
          <div style={{ color: tarifaFiltro === "REGULAR" ? '#39ff14' : '#666' }}>REGULAR</div>
          <div style={{ color: tarifaFiltro === "DISCAPACIDAD" ? '#ff007f' : '#666' }}>DISCAPACIDAD</div>
        </div>

        {/* FILA 1: ZONA ACCESO */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 1fr 1fr', gap: '12px', alignItems: 'center', opacity: tarifaFiltro === "DISCAPACIDAD" ? 0.25 : 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            <div style={{ width: '12px', height: '35px', backgroundColor: '#0070f3', borderRadius: '2px' }}></div>
            {dataPrecios.zonaAccesoName}
          </div>
          <div onClick={() => tarifaFiltro === "DSCTO" && seleccionarTarifa(`${dataPrecios.zonaAccesoName} (25% Dscto)`, dataPrecios.accesoDscto)} style={celdaPrecioEstilo(precioBase === dataPrecios.accesoDscto, tarifaFiltro === "DSCTO", temaAccent)}>S/ {dataPrecios.accesoDscto.toFixed(2)}</div>
          <div onClick={() => tarifaFiltro === "REGULAR" && seleccionarTarifa(`${dataPrecios.zonaAccesoName} (Regular)`, dataPrecios.accesoReg)} style={celdaPrecioEstilo(precioBase === dataPrecios.accesoReg, tarifaFiltro === "REGULAR", temaAccent)}>S/ {dataPrecios.accesoReg.toFixed(2)}</div>
          <div style={celdaDeshabilitadaEstilo()}>----</div>
        </div>

        {/* FILA 2: ZONA CORAZÓN */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 1fr 1fr', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            <div style={{ width: '12px', height: '35px', backgroundColor: '#ff007f', borderRadius: '2px' }}></div>
            {dataPrecios.zonaCorazonName}
          </div>
          <div onClick={() => tarifaFiltro === "DSCTO" && seleccionarTarifa(`${dataPrecios.zonaCorazonName} (25% Dscto)`, dataPrecios.corazonDscto)} style={celdaPrecioEstilo(precioBase === dataPrecios.corazonDscto, tarifaFiltro === "DSCTO", temaAccent)}>S/ {dataPrecios.corazonDscto.toFixed(2)}</div>
          <div onClick={() => tarifaFiltro === "REGULAR" && seleccionarTarifa(`${dataPrecios.zonaCorazonName} (Regular)`, dataPrecios.corazonReg)} style={celdaPrecioEstilo(precioBase === dataPrecios.corazonReg, tarifaFiltro === "REGULAR", temaAccent)}>S/ {dataPrecios.corazonReg.toFixed(2)}</div>
          <div onClick={() => tarifaFiltro === "DISCAPACIDAD" && seleccionarTarifa(`${dataPrecios.zonaCorazonName} (Con Discapacidad)`, dataPrecios.corazonDisc)} style={celdaPrecioEstilo(precioBase === dataPrecios.corazonDisc, tarifaFiltro === "DISCAPACIDAD", temaAccent)}>S/ {dataPrecios.corazonDisc.toFixed(2)}</div>
        </div>

        {/* FILA 3: ZONA GENERAL */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 1fr 1fr', gap: '12px', alignItems: 'center', opacity: tarifaFiltro === "DISCAPACIDAD" ? 0.25 : 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            <div style={{ width: '12px', height: '35px', backgroundColor: '#b5a1e2', borderRadius: '2px' }}></div>
            {dataPrecios.zonaGeneralName}
          </div>
          <div onClick={() => tarifaFiltro === "DSCTO" && seleccionarTarifa(`${dataPrecios.zonaGeneralName} (25% Dscto)`, dataPrecios.generalDscto)} style={celdaPrecioEstilo(precioBase === dataPrecios.generalDscto, tarifaFiltro === "DSCTO", temaAccent)}>S/ {dataPrecios.generalDscto.toFixed(2)}</div>
          <div onClick={() => tarifaFiltro === "REGULAR" && seleccionarTarifa(`${dataPrecios.zonaGeneralName} (Regular)`, dataPrecios.generalReg)} style={celdaPrecioEstilo(precioBase === dataPrecios.generalReg, tarifaFiltro === "REGULAR", temaAccent)}>S/ {dataPrecios.generalReg.toFixed(2)}</div>
          <div style={celdaDeshabilitadaEstilo()}>----</div>
        </div>

      </div>
    </div>
  );
}

// FUNCIONES DE ESTILOS AUXILIARES CORREGIDAS
function celdaPrecioEstilo(seleccionado, columnaActiva, colorAcento) {
  return {
    backgroundColor: seleccionado ? 'rgba(0, 229, 255, 0.15)' : columnaActiva ? '#cae8ff' : 'rgba(255,255,255,0.05)',
    color: seleccionado ? colorAcento : columnaActiva ? '#0f172a' : '#555555',
    border: seleccionado ? `2.5px solid ${colorAcento || '#00e5ff'}` : '1.5px solid #a3d2f6',
    borderRadius: '6px',
    padding: '14px',
    textAlign: 'center',
    fontSize: '17px',
    fontWeight: '900',
    cursor: columnaActiva ? 'pointer' : 'not-allowed',
    opacity: columnaActiva ? 1 : 0.3,
    transition: 'all 0.15s ease'
  };
}

function celdaDeshabilitadaEstilo() {
  return {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    color: '#444',
    border: '1px dashed #333',
    borderRadius: '6px',
    padding: '14px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'not-allowed'
  };
}

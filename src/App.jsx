import { useState } from "react";
import { ShoppingCart, X, CheckCircle } from "lucide-react";
import logo from "./assets/logo.png";
import vacaYogur from "./assets/vaca-yogur.png";
import leche from "./assets/leche.png";
import flores from "./assets/flores.png";
import acarreos from "./assets/acarreos.png";
import vaca from "./assets/vaca.png";
import "./index.css";

function App() {
  const saboresDisponibles = ["Fresa", "Mora", "Melocotón"];
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalLeche, setMostrarModalLeche] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [saboresTemp, setSaboresTemp] = useState({});
  const [cantidadLeche, setCantidadLeche] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [pasoFormulario, setPasoFormulario] = useState(false);
  const [confirmacion, setConfirmacion] = useState(false);
  const [mostrarCotizacion, setMostrarCotizacion] = useState(null);
  const [mostrarConfirmacionCotizacion, setMostrarConfirmacionCotizacion] = useState(false);
  const [datosCotizacionTemp, setDatosCotizacionTemp] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    barrio: "",
    comentarios: "",
    metodoPago: "Efectivo"
  });

  const [cotizar, setCotizar] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    descripcion: ""
  });

  const agregarSaborTemp = (sabor) => {
    setSaboresTemp((prev) => ({
      ...prev,
      [sabor]: (prev[sabor] || 0) + 1
    }));
  };

  const quitarSaborTemp = (sabor) => {
    setSaboresTemp((prev) => {
      const nuevo = { ...prev };
      if (nuevo[sabor] > 1) nuevo[sabor]--;
      else delete nuevo[sabor];
      return nuevo;
    });
  };

  const agregarAlCarrito = () => {
    const saboresAAgregar = Object.entries(saboresTemp)
      .map(([sabor, cantidad]) =>
        Array(cantidad).fill({ nombre: "Yogur Artesanal", sabor, precio: 15000, imagen: vacaYogur })
      )
      .flat();
    setCarrito((prev) => [...prev, ...saboresAAgregar]);
    setSaboresTemp({});
    setMostrarModal(false);
  };

  const agregarLecheAlCarrito = () => {
    const items = Array(cantidadLeche).fill({ nombre: "Leche por Litro", precio: 3500, imagen: leche });
    setCarrito((prev) => [...prev, ...items]);
    setCantidadLeche(0);
    setMostrarModalLeche(false);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  const totalConDomicilio = total > 0 ? total + 3000 : 0;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

const enviarPedido = () => {
  const { nombre, apellido, telefono, direccion, barrio, metodoPago, comentarios } = formulario;

  if (!nombre || !apellido || !telefono || !direccion || !barrio) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  const productosTexto = carrito
    .map((item) => `• ${item.nombre}${item.sabor ? ` - ${item.sabor}` : ""} - $${item.precio}`)
    .join("\n");

const mensaje = `
*NUEVO PEDIDO - LÁCTEOS LA MONA*

• Cliente: ${nombre} ${apellido}
• Teléfono: ${telefono}
• Dirección: ${direccion}
• Barrio: ${barrio}

*PRODUCTOS:*
${carrito.map((item) => `- ${item.nombre}${item.sabor ? ` - ${item.sabor}` : ""} - $${item.precio}`).join("\n")}

• Domicilio: $3000
• Total a pagar: $${totalConDomicilio}
• Método de pago: ${metodoPago}
• Comentarios: ${formulario.comentarios || "Ninguno"}
`;

const url = `https://wa.me/573204527480?text=${encodeURIComponent(mensaje)}`;
window.open(url, "_blank");


  setCarrito([]);
  setFormulario({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    barrio: "",
    comentarios: "",
    metodoPago: "Efectivo"
  });
  setPasoFormulario(false);
  setMostrarCarrito(false);
  setConfirmacion(false);
};


  const enviarCotizacion = () => {
    const { nombre, apellido, telefono, descripcion } = cotizar;
    if (!nombre || !apellido || !telefono || !descripcion) {
      alert("Por favor completa todos los campos para la cotización.");
      return;
    }
    setDatosCotizacionTemp({ ...cotizar });
    setMostrarConfirmacionCotizacion(true);
  };

  const confirmarCotizacion = () => {
    if (!datosCotizacionTemp) return;
   const mensaje = `
NUEVA SOLICITUD DE COTIZACIÓN - LÁCTEOS LA MONA

• Nombre: ${datosCotizacionTemp.nombre} ${datosCotizacionTemp.apellido}
• Teléfono: ${datosCotizacionTemp.telefono}
• Producto: ${mostrarCotizacion === "flores" ? "Flores por encargo" : "Servicio de Acarreos"}

*Descripción del pedido:*
${datosCotizacionTemp.descripcion}
`;

const url = `https://wa.me/573204527480?text=${encodeURIComponent(mensaje)}`;
window.open(url, "_blank");


    setCotizar({ nombre: "", apellido: "", telefono: "", descripcion: "" });
    setMostrarCotizacion(null);
    setMostrarConfirmacionCotizacion(false);
    setDatosCotizacionTemp(null);
  };

  return (
   <div className="min-h-screen bg-[#fef3c7] px-4 py-6">

      <header className="bg-yellow-400 px-4 py-3 shadow-lg flex items-center justify-between sticky top-0 z-50 rounded-xl">
        <div className="flex items-center gap-3">
          <img src={vaca} alt="Logo La Mona" className="h-12 w-12 rounded-full border-4 border-white shadow-md" />
        </div>
        <div className="text-center flex-1 animate-fade-in">
          <h1 className="logo-title">Lácteos La Mona</h1>
          <p className="text-sm italic text-gray-800 animate-pulse">Yogures, leche y más... La Mona los lleva a tu hogar</p>
        </div>
        <button onClick={() => setMostrarCarrito(true)} className="relative bg-white p-2 rounded-full shadow-lg hover:scale-105 transition">
          <ShoppingCart className="w-6 h-6" />
          {carrito.length > 0 && <span className="badge">{carrito.length}</span>}
        </button>
      </header>
      
    
      
<main className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">

  <ProductoCard
    imagen={vacaYogur}
    nombre="Yogur Artesanal"
    descripcion="1 litro c/u, leche de vaca calidad garantizada"
    precio={15000}
    boton="Seleccionar Sabor"
    onClick={() => setMostrarModal(true)}
  />
  <ProductoCard
    imagen={leche}
    nombre="Leche por Litro"
    descripcion="Leche fresca por litro, pedidos por encargo"
    precio={3000}
    boton="Seleccionar Cantidad"
    onClick={() => setMostrarModalLeche(true)}
  />
  <ProductoCard
    imagen={flores}
    nombre="Flores por Encargo"
    descripcion="Hermosos arreglos florales para toda ocasión. ¡Cotiza ya!"
    precio={0}
    boton="Cotizar Flores"
    onClick={() => setMostrarCotizacion('flores')}
  />
  <ProductoCard
    imagen={acarreos}
    nombre="Servicio de Acarreos"
    descripcion="Te ayudamos a mover tus cosas con seguridad. ¡Cotiza tu acarreo!"
    precio={0}
    boton="Cotizar Acarreo"
    onClick={() => setMostrarCotizacion('acarreos')}
  />
</main>




      {mostrarModal && renderModalSabores(saboresDisponibles, saboresTemp, agregarSaborTemp, quitarSaborTemp, agregarAlCarrito, setMostrarModal)}
      {mostrarModalLeche && renderModalLeche(cantidadLeche, setCantidadLeche, agregarLecheAlCarrito, setMostrarModalLeche)}
      {mostrarCarrito && renderCarrito(carrito, eliminarDelCarrito, totalConDomicilio, setPasoFormulario, setMostrarCarrito)}
      {pasoFormulario && renderFormulario(formulario, handleFormChange, setConfirmacion, setPasoFormulario)}
      {confirmacion && renderConfirmacion(setConfirmacion, enviarPedido)}
      {mostrarCotizacion && renderCotizacion(cotizar, setCotizar, enviarCotizacion, setMostrarCotizacion)}
      {mostrarConfirmacionCotizacion && renderConfirmacionCotizacion(confirmarCotizacion, setMostrarConfirmacionCotizacion)}
    </div>
  );
}

function ProductoCard({ imagen, nombre, descripcion, precio, boton, onClick }) {
  return (
    <div className="card w-full h-[280px] flex flex-col overflow-hidden bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out cursor-pointer group hover:bg-orange-100 hover:shadow-2xl hover:-translate-y-1 hover:rotate-[0.5deg]">
      
      <img
        src={imagen}
        alt={nombre}
        className="mx-auto w-full h-[140px] object-contain rounded-t-lg bg-white transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-105"
      />

      <div className="p-2 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 leading-tight">{nombre}</h2>
          <p className="text-xs text-gray-600 leading-snug">{descripcion}</p>
          {precio > 0 && (
            <p className="text-green-700 font-bold text-sm mt-1">
              ${precio.toLocaleString()} c/u
            </p>
          )}
        </div>
        
        {/* ✅ Botón corregido para móvil sin dañar escritorio */}
        <button
          className="button text-sm py-1 px-2 mt-2 sm:mt-auto"
          onClick={onClick}
        >
          {boton}
        </button>
      </div>
    </div>
  );
}


function renderModalSabores(sabores, saboresTemp, add, remove, confirmar, cerrar) {
  return (
    <div className="modal">
      <div className="bg-white p-6 rounded-lg w-80 shadow-xl relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={() => cerrar(false)}>
          <X />
        </button>
        <h3 className="section-title mb-3">Selecciona tus sabores:</h3>
        {sabores.map((sabor) => (
          <div key={sabor} className="flex justify-between mb-2">
            <span>{sabor}</span>
            <div>
              <button onClick={() => remove(sabor)} className="px-2 bg-red-500 text-white rounded">-</button>
              <span className="px-2">{saboresTemp[sabor] || 0}</span>
              <button onClick={() => add(sabor)} className="px-2 bg-green-500 text-white rounded">+</button>
            </div>
          </div>
        ))}
        <button onClick={confirmar} className="button w-full mt-4">Agregar al carrito</button>
      </div>
    </div>
  );
}

function renderModalLeche(cantidad, setCantidad, confirmar, cerrar) {
  return (
    <div className="modal">
      <div className="bg-white p-6 rounded-lg w-80 shadow-xl relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={() => cerrar(false)}>
          <X />
        </button>
        <h3 className="section-title mb-3">Cantidad de Leche por Litro:</h3>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setCantidad(Math.max(0, cantidad - 1))} className="px-3 py-1 bg-red-500 text-white rounded">-</button>
          <span className="text-lg font-bold">{cantidad}</span>
          <button onClick={() => setCantidad(cantidad + 1)} className="px-3 py-1 bg-green-500 text-white rounded">+</button>
        </div>
        <button onClick={confirmar} className="button w-full mt-4">Agregar al carrito</button>
      </div>
    </div>
  );
}

function renderCarrito(carrito, eliminar, total, continuar, cerrar) {
  return (
    <div className="modal items-end justify-end bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md h-[90vh] rounded-t-3xl shadow-2xl p-6 overflow-y-auto relative animate-fade-in-up">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl" onClick={() => cerrar(false)}>
          <X />
        </button>
        <h2 className="text-2xl font-bold text-center text-vaca mb-6">🛒 Tu Carrito</h2>
        {carrito.length === 0 ? (
          <p className="text-center text-gray-500">Tu carrito está vacío</p>
        ) : (
          <div className="space-y-4">
            {carrito.map((item, i) => (
              <div key={i} className="flex justify-between items-center border rounded-lg p-3 shadow-sm bg-white hover:shadow-md transition">
                <div className="flex items-center gap-2">
                  {item.imagen && <img src={item.imagen} alt="img" className="w-10 h-10 rounded" />}
                  <div>
                    <p className="font-semibold text-gray-800">{item.nombre}</p>
                    {item.sabor && <p className="text-sm text-gray-500">{item.sabor}</p>}
                  </div>
                </div>
                <button onClick={() => eliminar(i)} className="text-red-500 hover:scale-110 transition" title="Eliminar">✕</button>
              </div>
            ))}
          </div>
        )}
        {carrito.length > 0 && (
          <>
            <div className="border-t mt-6 pt-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Domicilio:</span>
                <span>$3.000</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-vaca mt-2">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
            <button onClick={() => continuar(true)} className="button w-full mt-6">Continuar con el pedido</button>
          </>
        )}
      </div>
    </div>
  );
}

function renderFormulario(datos, onChange, confirmar, cerrar) {
  return (
    <div className="modal">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl relative animate-fade-in scale-in">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition" onClick={() => cerrar(false)}>
          <X />
        </button>
        <h3 className="text-xl font-bold text-center text-vaca mb-4">📝 Completa tus datos</h3>
        {["nombre", "apellido", "telefono", "direccion", "barrio"].map((campo) => (
          <input key={campo} name={campo} placeholder={campo[0].toUpperCase() + campo.slice(1)} value={datos[campo]} onChange={onChange} className="input" />
        ))}
        <select name="metodoPago" value={datos.metodoPago} onChange={onChange} className="input">
          <option value="Efectivo">💵 Efectivo</option>
          <option value="Nequi">📱 Nequi</option>
          <option value="Daviplata">🏦 Daviplata</option>
        </select>
        <textarea name="comentarios" placeholder="Comentarios adicionales (opcional)" value={datos.comentarios} onChange={onChange} className="input" rows={3} />
        <button onClick={() => confirmar(true)} className="button w-full mt-3">Finalizar pedido</button>
      </div>
    </div>
  );
}

function renderConfirmacion(cancelar, confirmar) {
  return (
    <div className="modal bg-opacity-60">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
        <p className="mt-4">¿Estás seguro de enviar este pedido por WhatsApp?</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => cancelar(false)} className="button-secondary">Cancelar</button>
          <button onClick={confirmar} className="button">Confirmar</button>
        </div>
      </div>
    </div>
  );
}

function renderCotizacion(datos, setDatos, confirmar, cerrar) {
  return (
    <div className="modal">
      <div className="bg-white p-6 rounded-xl w-96 shadow-2xl relative animate-fade-in scale-in">
        <button onClick={() => cerrar(null)} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition">
          <X />
        </button>
        <h3 className="text-lg font-bold mb-4 text-vaca">📝 Cotización</h3>
        {["nombre", "apellido", "telefono"].map((campo) => (
          <input key={campo} name={campo} placeholder={campo[0].toUpperCase() + campo.slice(1)} value={datos[campo]} onChange={(e) => setDatos((prev) => ({ ...prev, [campo]: e.target.value }))} className="input" />
        ))}
        <textarea name="descripcion" placeholder="¿Qué necesitas?" value={datos.descripcion} onChange={(e) => setDatos((prev) => ({ ...prev, descripcion: e.target.value }))} className="input" rows={3} />
        <button onClick={confirmar} className="button w-full mt-3">Enviar solicitud</button>
      </div>
    </div>
  );
}

function renderConfirmacionCotizacion(confirmar, cancelar) {
  return (
    <div className="modal bg-opacity-60">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
        <p className="mt-4">Se te dirigirá al WhatsApp para enviar la solicitud. ¿Continuar?</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => cancelar(false)} className="button-secondary">Cancelar</button>
          <button onClick={confirmar} className="button">Aceptar</button>
        </div>
      </div>
    </div>
  );
}


export default App;

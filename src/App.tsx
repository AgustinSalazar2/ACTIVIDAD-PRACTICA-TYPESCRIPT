import { useState } from "react";
import "./App.css";

function App() {
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [operacion, setOperacion] = useState("suma");
  const [resultado, setResultado] = useState(0);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [pares, setPares] = useState(0);
  const [impares, setImpares] = useState(0);
  
  const [numero, setNumero] = useState<number>(1);
  const [limite, setLimite] = useState<number>(10);
  const [tabla, setTabla] = useState<string[]>([]);

  const [n, setN] = useState<number>(1);
  const [fibonacci, setFibonacci] = useState<number[]>([]);

  const [celsius, setCelsius] = useState<number>(0);
  const [fahrenheit, setFahrenheit] = useState<number>(32);
  const [isCelsiusInput, setIsCelsiusInput] = useState<boolean>(true);

  const [oracion, setOracion] = useState<string>('');
  const [cantidadPalabras, setCantidadPalabras] = useState<number>(0);

  // Definimos un tipo para las operaciones permitidas
  type Operacion = "suma" | "resta" | "multiplicacion" | "division";

  // Función para realizar las operaciones
  function calcular(num1: number, num2: number, operacion: Operacion): number {
    switch (operacion) {
      case "suma":
        return num1 + num2;
      case "resta":
        return num1 - num2;
      case "multiplicacion":
        return num1 * num2;
      case "division":
        if (num2 !== 0) {
          return num1 / num2;
        } else {
          throw new Error("No se puede dividir por cero.");
        }
      default:
        throw new Error("Operación no válida.");
    }
  }

  // Función para contar números pares e impares en un rango
function contarParesImpares(min: number, max: number): [number, number] {
  let pares = 0;
  let impares = 0;

  for (let i = min; i <= max; i++) {
      if (i % 2 === 0) {
          pares++;
      } else {
          impares++;
      }
  }

  return [pares, impares];
}

function paresImpares(minimo: number, maximo: number): void {
  const [pares, impares] = contarParesImpares(minimo, maximo);
  setPares(pares);
  setImpares(impares);
  return
}

// Función para mostrar la tabla de multiplicar de un número hasta cierto valor
  const mostrarTablaDeMultiplicar = () => {
    const nuevaTabla: string[] = [];
    for (let i = 1; i <= limite; i++) {
      const resultado = numero * i;
      nuevaTabla.push(`${numero} x ${i} = ${resultado}`);
    }
    setTabla(nuevaTabla);
  };

  // Función para generar los primeros N números de la secuencia de Fibonacci
  const generarFibonacci = () => {
    const fibonacciArray: number[] = [0, 1];

    for (let i = 2; i < n; i++) {
      const nextFibonacci = fibonacciArray[i - 1] + fibonacciArray[i - 2];
      fibonacciArray.push(nextFibonacci);
    }

    setFibonacci(fibonacciArray);
  };

  //Funcion para convertir temperaturas entre grados celsiul a fahrenheit:
  const handleCelsiusChange = (value: number) => {
    setCelsius(value);
    setFahrenheit((value * 9 / 5) + 32);
    setIsCelsiusInput(true);
  };

  const handleFahrenheitChange = (value: number) => {
    setFahrenheit(value);
    setCelsius((value - 32) * 5 / 9);
    setIsCelsiusInput(false);
  };

  //Funcion para contar la cantidad de palabras en una frase
  const contarPalabras = (texto: string) => {
    const palabras = texto.split(' ').filter(word => word.trim() !== '');
    return palabras.length;
  };

  const handleOracionChange = (value: string) => {
    setOracion(value);
    setCantidadPalabras(contarPalabras(value));
  };

  return (
    <>
      <h1>Calculadora</h1>
      <div className="card">
        <div>
          <input
            type="text"
            name="num1"
            onChange={(e) => setNumero1(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <input
            type="text"
            name="num2"
            onChange={(e) => setNumero2(parseFloat(e.target.value))}
          />
        </div>
        <div>
        <select value={operacion} onChange={(e)=>setOperacion(e.target.value)}>
          <option value="suma">Suma</option>
          <option value="resta">Resta</option>
          <option value="multiplicacion">Multiplicacion</option>
          <option value="division">Division</option>
        </select>
        </div>
        <button
          onClick={() => setResultado(calcular(numero1, numero2, operacion as Operacion))}
        >
          Calcular
        </button>
        <div>Resultado: {resultado}</div>
      </div>
      <h2>-------------------------------------------------------------------</h2>

      <h1>Contador numeros pares e impares</h1>

      <div className="card">
        <div>
          <input
            type="text"
            name="min"
            onChange={(e) => setMin(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <input
            type="text"
            name="max"
            onChange={(e) => setMax(parseFloat(e.target.value))}
          />
        </div>
        <button
          onClick={() => paresImpares(min, max)}
        >
          Calcular
        </button>
        <div>Cantidad de pares: {pares}</div>
        <div>Cantidad de impares: {impares}</div>
      </div>
      <h2>-------------------------------------------------------------------</h2>

      <h1>Tabla de Multiplicar</h1>
      <div>
        <label>Número: </label>
        <input type="number" value={numero} onChange={(e) => setNumero(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Límite: </label>
        <input type="number" value={limite} onChange={(e) => setLimite(parseInt(e.target.value))} />
      </div>
      <button onClick={mostrarTablaDeMultiplicar}>Mostrar Tabla</button>
      <div>
        <h2>Tabla de Multiplicar</h2>
        <ul>
          {tabla.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </ul>
      </div>
      <h2>-------------------------------------------------------------------</h2>

      <h1>Secuencia de Fibonacci</h1>
      <div>
        <label>Cantidad de números: </label>
        <input type="number" value={n} onChange={(e) => setN(parseInt(e.target.value))} />
      </div>
      <button onClick={generarFibonacci}>Generar Secuencia</button>
      <div>
        <h2>Secuencia de Fibonacci</h2>
        <ul>
          {fibonacci.map((num, index) => (
            <div key={index}>{num}</div>
          ))}
        </ul>
      </div>
      <h2>-------------------------------------------------------------------</h2>

      <h1>Convertidor de Temperatura</h1>
      <div>
        <label>Celsius: </label>
        <input type="number" value={celsius} onChange={(e) => handleCelsiusChange(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Fahrenheit: </label>
        <input type="number" value={fahrenheit} onChange={(e) => handleFahrenheitChange(parseFloat(e.target.value))} />
      </div>
      <div>
        <p>Convertir desde: {isCelsiusInput ? 'Celsius' : 'Fahrenheit'}</p>
      </div>
      <h2>-------------------------------------------------------------------</h2>

      <h1>Contador de Palabras</h1>
      <div>
        <label>Ingrese una oración: </label>
        <input type="text" value={oracion} onChange={(e) => handleOracionChange(e.target.value)} />
      </div>
      <div>
        <p>Cantidad de palabras: {cantidadPalabras}</p>
      </div>

    </>
  );
}

export default App;

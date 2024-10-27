import { useState, useEffect } from 'react';

interface Firecracker {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const firecrackers: Firecracker[] = [
  { id: 1, name: 'Sparkler', price: 5, quantity: 0 },
  { id: 2, name: 'Fountain', price: 10, quantity: 0 },
  { id: 3, name: 'Rocket', price: 15, quantity: 0 },
  { id: 4, name: 'Bomb', price: 20, quantity: 0 },
  { id: 5, name: 'Catherine Wheel', price: 25, quantity: 0 },
];

const App = () => {
  const [cart, setCart] = useState<Firecracker[]>([]);
  const [total, setTotal] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  const handleAddToCart = (firecracker: Firecracker) => {
    const existingFirecracker = cart.find((item) => item.id === firecracker.id);
    if (existingFirecracker) {
      setCart(
        cart.map((item) =>
          item.id === firecracker.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...firecracker, quantity: 1 }]);
    }
    setTotal(total + firecracker.price);
  };

  const handleRemoveFromCart = (firecracker: Firecracker) => {
    const existingFirecracker = cart.find((item) => item.id === firecracker.id);
    if (existingFirecracker && existingFirecracker.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === firecracker.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setTotal(total - firecracker.price);
    } else {
      setCart(cart.filter((item) => item.id !== firecracker.id));
      setTotal(total - firecracker.price);
    }
  };

  const handleCheckout = () => {
    alert(`Your total is: $${total}`);
    setCart([]);
    setTotal(0);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setTrail((prevTrail) => [...prevTrail, { x: event.clientX, y: event.clientY }]);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (trail.length > 50) {
      setTrail((prevTrail) => prevTrail.slice(-50));
    }
  }, [trail]);

  return (
    <div className="max-w-3xl mx-auto p-4 relative bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Firecrackers
      </h1>
      <ul className="mb-4">
        {firecrackers.map((firecracker) => (
          <li key={firecracker.id} className="flex justify-between mb-2 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
            <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {firecracker.name}
            </span>
            <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              ${firecracker.price}
            </span>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60"
              onClick={() => handleAddToCart(firecracker)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Cart
      </h2>
      <ul className="mb-4">
        {cart.map((firecracker) => (
          <li key={firecracker.id} className="flex justify-between mb-2 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
            <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {firecracker.name} x {firecracker.quantity}
            </span>
            <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              ${firecracker.price * firecracker.quantity}
            </span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60"
              onClick={() => handleRemoveFromCart(firecracker)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Total: ${total}
      </p>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      {trail.map((point, index) => (
        <div
          key={index}
          className="absolute w-2 h-2 bg-yellow-500 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 animate-pulse"
          style={{ left: point.x, top: point.y }}
        />
      ))}
      <div
        className="absolute w-4 h-4 bg-yellow-500 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 animate-pulse"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />
    </div>
  );
};

export default App;
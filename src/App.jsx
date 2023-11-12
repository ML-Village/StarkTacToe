import './App.css';
import TicTacToe from './components/TicTacToe';
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
import {Navbar} from './components/NavBar.jsx';

function App() {
  const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
  ];

  return (
    <StarknetConfig connectors={connectors}>
    <div className="w-full">
      <Navbar />
      <TicTacToe />;
    </div>
    </StarknetConfig>
  )
}

export default App

import './App.css';
import TicTacToe from './components/TicTacToe';

function App() {

  return (
    <div className="w-full">
    <header className="flex z-50 w-full bg-transparent text-sm py-4 border">
    <nav
        className="w-full mx-auto px-3 flex items-center justify-between"
        aria-label="Global"
      >


        
          <button
                type="button"
                className="
                ml-auto mr-1
                py-3 px-4 inline-flex items-center gap-x-2 
                text-sm font-semibold rounded-lg text-white
                border border-transparent
                bg-blue-600 hover:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-vertically-centered-modal"
                onClick={() => {}}
              >
                Connect Wallet
            </button>


      </nav>
    </header>
      <TicTacToe />;
    </div>
  )
}

export default App

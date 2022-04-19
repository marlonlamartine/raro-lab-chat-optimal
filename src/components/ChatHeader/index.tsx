import { memo, useEffect, useMemo, useState } from "react";
import { useChat } from "../../contexts/chat.context";

export const ChatHeader = memo(() => {
  const [displayValue, setDisplayValue] = useState('');

  const { participantes, buscaMensagem, setBuscaMensagem } = useChat();
  const contato = participantes.find(p => !p.usuarioAtual);
  const memoC = useMemo(() => contato, [participantes]);

  useEffect(() => {
    const handler = setTimeout(() => setBuscaMensagem(displayValue), 500);
    return () => clearTimeout(handler);
  }, [displayValue])

  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <span className="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <img
            src={memoC?.foto}
            alt={memoC?.nome}
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{memoC?.nome}</span>
          </div>
          <span className="text-lg text-gray-600">{memoC?.email}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </span>
          <input
            type="text"
            placeholder="Buscar mensagem"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            //value={buscaMensagem}
            //onChange={event => setBuscaMensagem(event?.target.value)}
            value={displayValue}
            onChange={event => setDisplayValue(event.target.value)}
          />
        </div>
      </div>
    </div>
  )
})
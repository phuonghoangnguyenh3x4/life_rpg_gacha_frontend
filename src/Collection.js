import React, { useState, useEffect } from "react";
import Inventory from "./components/Inventory";
import Loading from './components/Loading';
import "./styles/App.css";
import { useLocation } from 'react-router-dom';

function useQuery() { 
    return new URLSearchParams(useLocation().search); 
}

function Collection() {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const query = useQuery();
  const userName = query.get('username');

  // Fetch inventory from the server when the component mounts
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`https://life-rpg-gacha.onrender.com/get-collectables?username=${userName}`);
        const data = await response.json();
        setInventory(data); // Initialize the inventory state
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally { 
        setIsLoading(false); // Set loading to false once the data is fetched 
      }
    };
    fetchInventory();
  }, [userName]); // Empty dependency array ensures it runs only once

  return (
    <>
      {isLoading ? ( 
        <Loading />
      ) : (
        <div className="App">
            <Inventory inventory={inventory} />
        </div>
      )}
    </>
  );
}

export default Collection;

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDGbOSv0wh2wAN3U_nKTZUQWxlXa6180_o",
  authDomain: "megamoneyprinter.firebaseapp.com",
  projectId: "megamoneyprinter",
  storageBucket: "megamoneyprinter.appspot.com",
  messagingSenderId: "118568636825",
  appId: "1:118568636825:web:c516f95901a70a16df4308",
  measurementId: "G-J6E4G5R63W"
};

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const databaseRef = ref(database, 'game');

    // Attach a listener for real-time updates
    const listener = onValue(databaseRef, (snapshot) => {
      setData(snapshot.val());
    });

    // Check if data exists; if not, create initial data
    get(databaseRef).then((snapshot) => {
      const initialData = snapshot.val();
      if (!initialData) {
        // Create initial data structure
        const initialDataStructure = {
          // Add your initial data properties here
          exampleProperty: 'exampleValue',
        };

        // Set the initial data in the database
        set(databaseRef, initialDataStructure)
          .then(() => {
            console.log('Initial data created successfully');
          })
          .catch((error) => {
            console.error('Error creating initial data:', error);
          });
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      // Cleanup the listener
      // Note: 'off' is not used in the modular SDK
    };
  }, []);// Empty dependency array to run the effect once on mount

  return (
    <div>
      <h1>Money Printer</h1>
      {data && <p>{data.exampleProperty}</p>}
    </div>
  );
};

export default MyComponent;

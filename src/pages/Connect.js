import React, { useEffect, useState } from 'react';
import indianLawyersData from './indianLawyersData';
import Stars from './starRating';
import axios from 'axios';
import { allLawyersRoute, connectLawyerRoute, getUserRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router';

const Connect = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [lawyers, setLawyers] = useState(null);
  const [user, setUser] = useState(null);
  const [connectedLawyers, setConnectedLawyers] = useState([]);

  const fetchUser = async () => {
    try {
      const userid = await JSON.parse(localStorage.getItem("nayay"))._id
      const response = await axios.get(`${getUserRoute}/${userid}`)
      if (response) {
        setUser(response.data)
        console.log(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get(allLawyersRoute)
        if (response) {
          setLawyers(response.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchUser()
    fetchLawyers()
  }, [])

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleLoadMore = () => {

  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleConnect = async (id) => {
    try {
      const userID = await JSON.parse(localStorage.getItem("nayay"))._id;
      const response = await axios.put(connectLawyerRoute, { userID, id })
      if (response) {
        console.log(response.data)
        fetchUser()
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="connect-container pt-[74px]">

      <div>

      <div className='connect-form-container'>
        <div className="connect-form">
          <h3>Search for Lawyers</h3>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button>Search</button>
        </div>

        <div className="connect-form">
          <h3>Upload Your Document</h3>
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className="lawyer-cards">
        {/* {lawyers?.filter(lawyer => !user?.lawyers.includes(lawyer._id)).map(l => (
          <>
            <div>{l.name}</div>
            <button className="h-10 bg-violet-800 rounded-lg" onClick={() => handleConnect(l._id)}>Connect</button>
          </>
        ))} */}
        {lawyers?.filter(l => l.bio.includes(searchText) || l.name.includes(searchText) || l.fields.includes(searchText) || l.tags.includes(searchText))
          .map((lawyer, index) => (
            <div className="lawyer-card" key={index}>
              <div className="lawyer-details">
                {/* <img src={lawyer.image} alt={lawyer.name} /> */}
                <h2>{lawyer.name}</h2>
                <p>
                  <Stars rating={lawyer.rating} />
                </p>
              </div>
              <p className="lawyer-bio">{lawyer.bio}</p>
              <button
                className={connectedLawyers.includes(lawyer.name) ? "connected-button" : "connect-button"}
                onClick={() => handleConnect(lawyer._id)}
              >
                {user?.lawyers.includes(lawyer._id) ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="load-more-button">
        <button onClick={() => navigate("/chatu")}>Chat</button>
      </div> */}

      <div>

      </div>

    </div>
  );
};

export default Connect;

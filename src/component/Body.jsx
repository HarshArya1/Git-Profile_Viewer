import { useEffect, useState } from "react";

function Body() {
    const [Profile, setProfile] = useState([]);
    const [numberofProfile, setnumberofProfile] = useState("");
    const [Username, setUsername] = useState("");
    const [userProfile, setUserProfile] = useState(null); // Added state for individual user profile

    async function generateProfile(count) {
        try {
            const ran = Math.floor(Math.random() * 10000);
            const response = await fetch(`https://api.github.com/users?since=${ran}&per_page=${count}`);
            const data = await response.json();
            setProfile(data);
            setUserProfile(null); // Clear individual user profile
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        generateProfile(10);
    }, []);

    async function generateUsername(name) {
        try {
            const response2 = await fetch(`https://api.github.com/users/${name}`);
            const data2 = await response2.json();
            setUserProfile(data2); // Update the state with the fetched user profile
            setProfile([]); // Clear the profiles list
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="but">
            <div className="con">
                <div>
                    <input
                        type="text"
                        className="inpu"
                        placeholder="Enter Number of Profiles"
                        value={numberofProfile}
                        onChange={(e) => setnumberofProfile(e.target.value)}
                    />
                    <button id="submit" onClick={() => generateProfile(Number(numberofProfile))}>Search Profiles</button>
                </div>
                <div>
                    <input
                        type="text"
                        className="inpu"
                        placeholder="Get Profile link by Username"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={() => generateUsername(Username)} id="reset">Search Profile</button>
                </div>
            </div>
            <div className="profile">
                {Profile.map((value) => (
                    <div key={value.id} className="cards">
                        <img src={value.avatar_url} alt={`${value.login}'s avatar`} />
                        <h2>{value.login}</h2>
                        <a href={value.html_url} target="_blank" rel="noopener noreferrer">Profile Link</a>
                    </div>
                ))}
                {userProfile && (
                    <div key={userProfile.id} className="cards">
                        <img src={userProfile.avatar_url} alt={`${userProfile.login}'s avatar`} />
                        <h2>{userProfile.login}</h2>
                        <a href={userProfile.html_url} target="_blank" rel="noopener noreferrer">Profile Link</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Body;

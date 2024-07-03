import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Tabs from "./UI/tabs";
import { userIcon } from "../icons";

const Search = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const [searchResults, setSearchResults] = useState({
    accounts: [],
    posts: [],
    searched: false,
  });

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      let url = `http://localhost:3001/search?searchkeyword=${searchKeyword}`;
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          setSearchResults({ ...res, searched: true });
        });
    }
  };

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Type username"
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleSearch}
      ></input>
      {searchResults.searched && (
        <>
          <Tabs
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            tabs={[
              {
                id: 1,
                title: "For you",
              },
              {
                id: 2,
                title: "Accounts",
              },
            ]}
          />
          {selectedTab === 2 &&
            searchResults.accounts.map((acct) => (
              <Link to={`/profile/${acct.userName}`}>
                <div style={{ display: "flex" }}>
                  <div style={{ height: 50, padding: 10 }}>
                    {acct.picture || userIcon()}
                  </div>
                  <div style={{ padding: "10px", textAlign: "left" }}>
                    <div style={{ lineHeight: "25px" }}>{acct.userName}</div>
                    <div>{acct.name}</div>
                  </div>
                </div>
              </Link>
            ))}
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Search;

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Badge, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

interface User {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  onlineStatus: string;
  country: string[];
}

interface SearchUsersProps {
  onSelectUser: (user: User) => void;
  searchResults: User[];
  isLoading: boolean;
  onSearch: (query: string) => void;
}

const SearchUsers: React.FC<SearchUsersProps> = ({
  onSelectUser,
  searchResults,
  isLoading,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {/* Search Input */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Search Results */}
      <div className="max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {searchResults.map((user) => (
              <li
                key={user.uuid}
                className="hover:bg-gray-50 transition-colors cursor-pointer p-4"
                onClick={() => onSelectUser(user)}
              >
                <div className="flex items-center space-x-4">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color={user.onlineStatus === "1" ? "success" : "error"}
                  >
                    <Image
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <Tooltip title={`${user.firstName} ${user.lastName}`}>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                    </Tooltip>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {user.country.map((country, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectUser(user);
                      }}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : searchQuery ? (
          <div className="p-4 text-center text-gray-500">
            No users found matching your search
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Start typing to search for users
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;

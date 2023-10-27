import { useState } from "react";
import Menu from "./menu";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@remix-run/react";

export default function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Button
        variant="secondary"
        className="h-11 w-11 p-1"
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 6l16 0"></path>
          <path d="M4 12l16 0"></path>
          <path d="M4 18l16 0"></path>
        </svg>
        <span className="sr-only">Open Side Menu</span>
      </Button>
      <div
        className={`min-h-screen duration-300 h-full absolute w-[320px] ${
          isOpen ? "left-0" : "-left-[320px]"
        } top-0 z-50`}
      >
        <div className="bg-white h-full w-[320px] border-x-2 p-4">
          <div className="float-right">
            {isOpen ? (
              <Button
                variant="secondary"
                className="h-11 w-11 p-1"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
                <span className="sr-only">Close Side Menu</span>
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="h-11 w-11 p-1"
                onClick={handleOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l14 0"></path>
                  <path d="M13 18l6 -6"></path>
                  <path d="M13 6l6 6"></path>
                </svg>
                <span className="sr-only">Open Side Menu</span>
              </Button>
            )}
          </div>
          <Menu onClick={handleClose} onLogout={handleLogout} />
        </div>
      </div>
      {isOpen && (
        <div
          aria-label="click outside to close menu"
          onClick={handleClose}
          className="absolute duration-300 bg-black/5 left-0 top-0 h-full w-full z-40"
        />
      )}
    </>
  );
}

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";

const START_MINUTES = "00";
const START_SECOND = "10";
const START_DURATION = 10;

function Home() {
  const navigate = useNavigate();

  const [flag, setFlag] = useState("");
  const [json, setJson] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userPhoto, setUserPhoto] = useState([]);
  const [userComment, setUserComment] = useState([]);

  const [resetTime, setResetTime] = useState(60000);

  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  // const [timer, setTimer] = useState(0);
  // setTimeout(() => {
  //   setTimer(timer + 1);
  // }, 1000);

  // setTimeout(() => {
  //   logout();
  // }, 50000);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getAll", {
        headers: { auth: `${JSON.parse(localStorage.getItem("auth"))}` },
      })
      .then((res) => {
        console.log(res); // Here we get the token in data
        setJson(res.data);
      })
      .catch((err) => {
        // toast.error(err.response.data);
      });
  }, []);

  useEffect(() => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    setIsRunning(true);
  });

  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);

    switch (flag) {
      case flag === "userData":
        const time1 = setTimeout(() => {
          logout();
        }, 1000);
        return () => {
          clearInterval(time1);
        };
        break;

      case flag === "userPhoto":
        const time2 = setTimeout(() => {
          logout();
        }, 1000);
        return () => {
          clearInterval(time2);
        };
        break;

      case flag === "userComment":
        const time3 = setTimeout(() => {
          logout();
        }, 1000);
        return () => {
          clearInterval(time3);
        };
        break;
      default:
        return null;
    }

    // if (flag === "userData") {
    //   const time1 = setTimeout(() => {
    //     logout();
    //   }, 1000);
    //   return () => {
    //     clearInterval(time1);
    //   };
    // } else if (flag === "userPhoto") {
    //   const time2 = setTimeout(() => {
    //     logout();
    //   }, 1000);
    //   return () => {
    //     clearInterval(time2);
    //   };
    // } else if (flag === "userComment") {
    //   const time3 = setTimeout(() => {
    //     logout();
    //   }, 1000);
    //   return () => {
    //     clearInterval(time3);
    //   };
    // }
  };
  console.log("Flagssss", flag);

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
          logout();
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
          console.log("Timer is", timer);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const userDetails = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
      setUserData(response.data);
      setFlag("userData");
      resetHandler();
    });
  };

  const userPhotos = async () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos`)
      .then((response) => {
        setUserPhoto(response.data);
        setFlag("userPhoto");
        resetHandler();
      });
  };

  const userComments = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .then((response) => {
        setUserComment(response.data);
        setFlag("userComment");
        resetHandler();
      });
  };
  console.log("Current Minutes ====> ", currentMinutes);
  console.log("Current Seconds ", currentSeconds);

  return (
    <Container>
      <div>
        <p>{JSON.stringify(json)}</p>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <h3>Time:</h3>
        <div className="time">
          {currentMinutes}
          <span className="mx-3">:</span>
          {currentSeconds}
        </div>
        {/* {!isRunning && !isStop && (
          <button
            onClick={startHandler}
            className="btn btn-primary btn-lg inline me-3"
          >
            START
          </button>
        )} */}
      </div>
      <Row>
        <Col xs={3}>
          <div>
            <button onClick={userDetails} className="sidebar_button">
              User Details
            </button>
            <button onClick={userPhotos} className="sidebar_button">
              User Images
            </button>
            <button onClick={userComments} className="sidebar_button">
              Albums
            </button>
          </div>
        </Col>

        <Col xs={9}>
          <div>
            {flag === "userData" &&
              userData.map((user, i) => (
                <div className="column_flex">
                  <div key={i} className="details_box">
                    <p>
                      <b>User Name:</b> {user.name}
                    </p>
                    <p>
                      <b>Email</b>
                      {user.email}
                    </p>
                    <p>
                      <b>Address</b>
                      {user.address.suite}
                    </p>
                    <p>
                      <b>Address</b>
                      {user.address.street}
                    </p>
                    <p>
                      <b>Address</b>
                      {user.address.city}
                    </p>
                    <p>
                      <b>Address</b>
                      {user.address.zipcode}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div>
            {flag === "userPhoto" &&
              userPhoto.map((img, j) => (
                <div className="column_flex">
                  <div key={j} className="details_box">
                    <p>
                      <b>Image Title: </b>
                      {img.title}
                    </p>
                    <img src={img.url} alt="image" className="image_img" />
                  </div>
                </div>
              ))}
          </div>

          <div>
            {flag === "userComment" &&
              userComment.map((comt, k) => (
                <div className="column_flex">
                  <div key={k} className="details_box">
                    <p>
                      <b>Comment Name: </b>
                      {comt.name}
                    </p>
                    <p>
                      <b>Email: </b>
                      {comt.email}
                    </p>
                    <p>
                      <b>Comment: </b>
                      {comt.body}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

import "./styles.css";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_response: {},
      isLoaded: false,
      pincode: "110001",
      date_input: "10-05-2021"
    };
  }

  componentDidMount() {
    var input_pin = prompt("Enter pincode");
    this.setState({ pincode: input_pin });
    if (input_pin === "") {
      console.log("Null pincode entered");
      this.setState({ isLoaded: true });
      return null;
    }
    console.log("Calling API");
    fetch(
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" +
        input_pin +
        "&date=" +
        this.state.date_input
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({ isLoaded: true, api_response: json });
      });
    console.log(this.state.api_response);
  }

  renderBody() {
    var { isLoaded, api_response } = this.state;
    console.log(api_response.centers);
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (api_response.centers === []) {
      console.log("No");
      return <h3>Sorry, no results found for this area</h3>;
    } else {
      console.log("Yes");
      return (
        <div>
          {api_response.centers.map(function (center_info) {
            return (
              <div className="jumbotron">
                <h3 className="display-5">{center_info.name}</h3>
                <p>
                  <em>{center_info.address}</em>
                </p>
                <hr className="my-4"></hr>
                <ul className="list-group list-group-flush">
                  {center_info.sessions.map(function (
                    vaccination_session_info
                  ) {
                    return (
                      <li className="list-group-item">
                        <div>
                          Date: {vaccination_session_info.date}
                          <br />
                          Vaccine Available: {vaccination_session_info.vaccine}
                          <br />
                          Minimum Age: {vaccination_session_info.min_age_limit}
                          <br />
                          Available Doses:{" "}
                          {vaccination_session_info.available_capacity}
                          <br />
                          {vaccination_session_info.slots.map(function (slot) {
                            return (
                              <a href="#" className="badge badge-success">
                                {slot}
                              </a>
                            );
                          })}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Showing results for pincode - {this.state.pincode}</h1>
        {/* <div className="inputs">
          <div className="col-4 input-group input-group-mb3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-lg">
                Pincode
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
            ></input>
            <label for="example-date-input" className="col-form-label">
              Date
            </label>
            <div className="col-5">
              <input
                className="form-control"
                type="date"
                value="2021-05-10"
                id="example-date-input"
              ></input>
            </div>
            <button type="button" className="btn btn-primary">
              Search
            </button>
          </div>
        </div> */}
        {this.renderBody()}
      </div>
    );
  }
}

export default App;

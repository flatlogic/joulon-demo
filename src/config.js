let hostApi, hostUi, portApi, portUi;

if (process.env.NODE_ENV === "development") {
  hostApi = "http://localhost";
  hostUi = "http://localhost";
  portApi = 8080;
  portUi = 3000;
} else {
  hostApi = "https://joulon-flatlogic-api.herokuapp.com";
  hostUi = "https://joulon-flatlogic.herokuapp.com";
  portApi = "";
  portUi = "";
}

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}`;
const baseURLUi = `${hostUi}${portUi ? `:${portUi}` : ``}`;

const config = {
  hostApi,
  hostUi,
  portApi,
  portUi,
  baseURLApi,
  baseURLUi,
  auth: {
    clientID: "4v2PtoTkeYOHuhm-hqoueoz6cee95v2b",
    domain: "joulon-flatlogic.auth0.com",
    audience: "https://joulon-api-identifier/"
  }
};

export default config;
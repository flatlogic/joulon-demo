let host, port;

if (process.env.NODE_ENV === "development") {
  host = "http://localhost";
  port = 8080;
} else {
  host = "http://joulon-flatlogic-api.herokuapp.com";
  port = "";
}

const baseURL = `host${port ? `:${port}` : ``}`;

const config = {
  host,
  port,
  baseURL
};

export default config;
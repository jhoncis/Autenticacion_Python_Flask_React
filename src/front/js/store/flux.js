const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: null,
		message: null,
		usuario: null,
		rol: null,
		proveedores:[],
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
	  },
	  actions: {
		// Use getActions to call a function within a fuction
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		syncTokenFromSessionStore: async () => {
		  const store = getStore();
		  const token = sessionStorage.getItem("token");
		  setStore({ token: token });
		  console.log(
			"Aplication just loaded, synching the session storage token"
		  );
		  if (store.token && store.token != "" && store.token != undefined) {
			const opts = {
			  method: "GET",
			  headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			  },
			};
			try {
			  // fetching data from the backend
			  const resp = await fetch(
				process.env.BACKEND_URL + "/api/token",
				opts
			  );
			  const data = await resp.json();
			  console.log(data);
			  setStore({
				usuario: data.user,
				rol: data.rol,
			  });
  
			  // don't forget to return something, that is how the async resolves
			  return data;
			} catch (error) {
			  console.log("Error loading message from backend", error);
			}
		  }
		},
  
		logout: () => {
		  sessionStorage.removeItem("token");
		  console.log("Loging out");
		  setStore({ token: null, usuario: null, rol: null });
		},
  
		loging: async (email, password) => {
		  const opts = {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  };
		  try {
			const resp = await fetch(
			  process.env.BACKEND_URL + "/api/loging",
			  opts
			);
			if (resp.status !== 200) {
			  alert("There has been some error");
			  return false;
			}
			const data = await resp.json();
			console.log("this came from the backend", data);
			sessionStorage.setItem("token", data.token);
			setStore({
			  token: data.token,
			  usuario: data.user,
			  rol: data.rol,
			});
			return true;
		  } catch (error) {
			console.error("There has been an error login in");
		  }
		},
  
		signup: async (user) => {
		  console.log("User");
		  const store = getStore();
		  const usuario = {
			email: user.correo,
			password: user.clave,
		  };
		  const opts = {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(usuario),
		  };
		  try {
			if (usuario.email == "") {
			  const resp = await fetch(
				process.env.BACKEND_URL + "/api/user",
				opts
			  );
			} else {
			  const resp = await fetch(
				process.env.BACKEND_URL + "/api/user",
				opts
			  );
			}
			if (resp.status !== 200) {
			  alert("There has been some error");
			  return false;
			}
			const data = await resp.json();
			//sessionStorage.setItem("token", data.access_token);
			//setStore({token: data.access_token, usuario: data.user, rol: data.rol})
			alert("Registrado con exito");
			return true;
		  } catch (error) {
			console.error("There has been an error login in");
		  }
		},
	  },
	};
  };
  
  export default getState;
  

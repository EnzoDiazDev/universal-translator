import app from "./server/app"

async function main(){
	app.listen(app.get("port"), () => console.log(`Corriendo en puerto ${app.get("port")}.`))
}

main()

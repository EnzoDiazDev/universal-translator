import app from "./server/app"

async function main(){
	app.listen(app.get("port"), () => console.log(`App running on port ${app.get("port")}.`))
}

main()

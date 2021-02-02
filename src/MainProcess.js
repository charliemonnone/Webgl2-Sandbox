const { app, BrowserWindow, 
		ipcMain, Menu, 
		Renderer} 					= require('electron');
const fs 							= require('fs');
const { appMenuTemplate }			= require('./ui/MenuTemplates');

let defaultWidth 	= 1280;
let defaultHeight 	= 720;
let defaultOpacity	= 1.0;

function initIPCHandlers(win) {
	ipcMain.handle('update-opacity', (event, value) => {
		win.setOpacity(value);
	});
}


function createWindow() {
	const win = new BrowserWindow({
		width: defaultWidth,
		height: defaultHeight,
		icon: `${__dirname}/assets/canvas_icon.ico`,
		fullscreenable: true,
		resizable: true,
		opacity: defaultOpacity,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
		}
	});

	initIPCHandlers(win);
	win.loadFile('./index.html');
}

function mainProcess() {

	
	const menu = Menu.buildFromTemplate(appMenuTemplate);
	Menu.setApplicationMenu(menu)

	app.whenReady().then(createWindow);

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});


	

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

	

	// ipcMain.on('asynchronous-message', (event, arg) => {
	// 	console.log(arg) // prints "ping"
	// 	event.reply('asynchronous-reply', 'pong')
	// })

	// ipcMain.on('synchronous-message', (event, arg) => {
	// 	console.log(arg) // prints "ping"
	// 	event.returnValue = 'pong'
	// })
}

mainProcess();
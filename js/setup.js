function setup() {
	game = new Game();
}

class Game {
	constructor(data) {
		this.cookies = new Decimal(0);
		this.cookieClicks = 0;
		this.totalProdCookies = new Decimal(0);
		this.clickPro = new Decimal(1);
		this.cps = new Decimal(0);
		this.tickspeedrcp = new Decimal(1);
		this.tooltip = '';
		
		this.generators = [];
		
		for (let i = 0; i < 16; i++) {
			this.generators[i] = [];
			for (let j = 0; j < 8; j++) {
				this.generators[i][j] = new Generator(i, j);
			}
		}
		
		// Begin Data Objects
		this.upgradeData = [
			{
				name: 'upg0',
				cost: new Decimal(10),
				icon: 'assets/img/cookie.png',
				onBuy: () => this.generators[0][0].multMult(2),
				visReq: () => this.generators[0][0].amount.gte(1),
				purpose: 'Multiplies 1D cursor efficiency by 2.'
			},
			{
				name: 'upg1',
				cost: new Decimal(10),
				icon: 'assets/img/cookie.png',
				onBuy: () => this.generators[0][0].multMult(2),
				visReq: () => this.cookies.gte(10),
				purpose: 'Multiplies 1D cursor efficiency by 2.'
			}
		]
		
		this.achievementData = [
			{
				name: 'ach0',
				icon: 'assets/img/cookie.png',
				unlockReq: () => this.totalProdCookies.gte(1),
				unlockTxt: 'Bake 1 cookie.'
			}
		]
		
		// End Data Objects
		
		this.upgrades = [];
		
		for (let i = 0; i < this.upgradeData.length; i++) {
			this.upgrades[i] = new Upgrade(this.upgradeData[i].name, this.upgradeData[i].cost, false, this.upgradeData[i].icon, this.upgradeData[i].onBuy, this.upgradeData[i].visReq);
		}
		
		this.achievements = [];
		
		for (let i = 0; i < this.achievementData.length; i++) {
			this.achievements[i] = new Achievement(i, this.achievementData[i].name, this.achievementData[i].icon, this.achievementData[i].unlockReq, false);
		}
		
		this.buyAmount = new Decimal(1);
		document.getElementById('bulk').value = this.buyAmount;
		this.buymax = false;
		
		this.tab = 0;
		this.subtab = 0;
		this.shoptab = 0;
		
		this.autosave = true;
		this.autosaveintv = 30;
		document.getElementById('asintv').value = this.autosaveintv;

		this.vers = '1.2.0';
		
		if (data) {
			try {
				this.cookies = new Decimal(data.cookies);
				this.clickPro = new Decimal(data.clickPro);
				this.cookieClicks = data.cookieClicks;
				this.totalProdCookies = new Decimal(data.totalProdCookies);
				this.tickspeedrcp = new Decimal(data.tickspeedrcp);
				
				for (let i = 0; i < 16; i++) {
					this.generators[i] = [];
					for (let j = 0; j < 8; j++) {
						this.generators[i][j] = new Generator(i, j, data.generators[i][j].amount, data.generators[i][j].bought, 1);
					}
				}
				
				for (let i = 0; i < this.upgrades.length; i++) {
					this.upgrades[i] = new Upgrade(this.upgradeData[i].name, this.upgradeData[i].cost, data.upgrades[i].bought, this.upgradeData[i].icon, this.upgradeData[i].onBuy, this.upgradeData[i].visReq);
				}
				
				for (let i = 0; i < this.achievementData.length; i++) {
					this.achievements[i] = new Achievement(i, this.achievementData[i].name, this.achievementData[i].icon, this.achievementData[i].unlockReq, data.achievements[i].unlocked);
				}
				
				this.buyAmount = new Decimal(data.buyAmount);
				document.getElementById('bulk').value = this.buyAmount;
				this.buymax = data.buymax;
				
				this.tab = data.tab;
				this.subtab = data.subtab;
				this.shoptab = data.shoptab;
				
				this.autosave = data.autosave;
				this.autosaveintv = data.autosaveintv;
				document.getElementById('asintv').value = this.autosaveintv;
			} catch(err) {
				console.log(err);
				wipe();
			}
		}
	}
}
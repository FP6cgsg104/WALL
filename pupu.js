window.addEventListener('load', main, false);
function main(){
	console.log('works');
	/*длина канваса
	ширина канваса
	волшебные фразы, чтобы все работало (как я понял это переприсваивание более короткого и мени для удобства записи)
	количество ФПС
	переменная обеспечивающая плавность
	время между кадрами
	радиус запускаемого круга
	ускорение свободного падения
	коэфициент теряния механической энергии при отскоке
	количество молекул
	количество молекул в ряду
	количество молекул в столбце
	одна из констант в силе Леннарда-Джонса
	расстояние, при котром сила Леннарда-Джонса равна 0
	масса молекул
	масса запускаемого шарика
	максимально допустимая скорость
	максимально допустимое ускорение
	коэффициент упругости пружины*/
	const w = canvas.width;
	const h = canvas.height;
	const ctx = canvas.getContext('2d');
	const fps = 1000;
	const deltaTime = 1/fps;
	const DELTA = 1000 * deltaTime;
	const Radius_Main = 20;
	const Radius_Min = 5;
	const g = 10;
	const Koef_Otskoka = 0.95;
	const Colvo_Kirpichey = 32;
	const Colvo_Tochek_X = 10;
	const Colvo_Tochek_Y = 10;
	/*const W_Kirpicha = 20;
	const H_Kirpicha = 10;*/
	const D = 0.5;
	const da = 100;
	const Vmax = 30;
	const Amax = 10;
	const K_prushiny = 0.0001;
	/*const Mass_Chastic = button_inputMP.value;
	const Mass_Circle = button_inputMM.value;
	console.log(Mass_Circle);
	console.log(Mass_Chastic);*/

	/*координаты запускаемого круга по иксу
	координаты запускаемого круга по игрику
	скорость шарика по иксу
	скорость шарика по игрику
	предыдущая скорость шарика по иксу
	предыдущая скорость шарика по игрику
	изменение координат запускаемого круга по иксу за единицу времени
	изменение координат запускаемого круга по игрику за единицу времени
	сила с которой метается шарик
	угол под которым метается шарик
	фигня, нужная для завершения интревала
	отсекает равномерное возрастание переменной времени в update
	флажок ддля старта/стопа
	флажок для cмены направления движения по оси икс, предотвращает застревание в стенке
	флажок для cмены направления движения по оси игрик, предотвращает застревание в стенке
	*/
	let X_Ball_Center = 65; 
	let Y_Ball_Center = 730;
	let X_Ball_Center_Prev = 0;
	let Y_Ball_Center_Prev = 0;
	let VX_Ball_Center = 0;
	let VY_Ball_Center = 0;
	let VX_Ball_Center_Prev = 0;
	let VY_Ball_Center_Prev = 0;
	let DX_Ball_Center = 0;
	let DY_Ball_Center = 0;
	let Speed_metres_per_sec = 0;
	let Angle_Radian = 0; 
	let program = 0;
	let i = 1;
	let flag_start = 0;
	let flag_X = 0;
	let flag_Y = 0;
	/*let X_Tochki  = w/2;
	let Y_Tochki = h/5;*/

	/*Массив всех координат по иксу
	Массив всех координат по игреку
	Массив всех скоростей по иксу
	Массив всех скоростей по игрику
	Массив всех ускорений по иксу
	Массив всех ускорений по игреку
	Массив всех предыдущих координат по иксу
	Массив всех предыдущих координат по игреку
	Массив всех координат начала пружин по иксу
	Массив всех координат начала пружин по игреку
	Массив всех масс
	Расстояние между точками
	косинус угла(для вычисления проекций ускорения)
	синус угла(для вычисления проекций ускорения)
	
	*/
	let X_SQ_Center = [];
	let Y_SQ_Center = [];
	let VX_SQ_Center = [];
	let VY_SQ_Center = [];
	let AX_SQ_Center = [];
	let AY_SQ_Center = [];
	let X_SQ_Center_Prev = [];
	let Y_SQ_Center_Prev = [];
	let X_Nacahalo = [];
	let Y_Nacahalo = [];
	let Mass = [];
	/*let v = 300;
	let r = 10;*/
	let r_Toch = 0;
	let cosA = 0;
	let sinA = 0;
	let s  = 0;

	let count = 0;

	let V_obch = 0;
	let ca = 1;
	let adop = 0;
	let r_Pr = 0;
	let flag_zadaniya_steny = 0;
	/*for (let i = 0; i < Colvo_Kirpichey + 1; i++) {
		if (i == 0) {
			X_SQ_Center[i] = X_Ball_Center;
			Y_SQ_Center[i] = Y_Ball_Center;
			VY_SQ_Center[i] = 0;
			VX_SQ_Center[i] = 0;
			AX_SQ_Center[i] = 0;
			AX_SQ_Center[i] = 0;
			Mass[i] = 60;
			continue;
		}
		X_SQ_Center[i] = 300 + s;
		X_Nacahalo[i] = 300 + s;
		Y_SQ_Center[i] = 50+ ca;
		Y_Nacahalo[i] = 50 + ca;
		s+= da + 10;
		count++;
		if(count >= 4)
		{
			count = 0;
			ca += da + 10;
			s = 0;
		}
		VY_SQ_Center[i] = 0;
		VX_SQ_Center[i] = 0;

		AX_SQ_Center[i] = 0;
		AX_SQ_Center[i] = 0;
		Mass[i] = 10;
	}*/

	//console.log(X_SQ_Center);

	circle(X_SQ_Center[0],Y_SQ_Center[0],0,0,0, Radius_Main);
	/*функция отрисовки круга*/
	function circle(x, y, r, g, b, R){
		ctx.beginPath();
		ctx.strokeStyle = `rgb(${r},${g},${b})`;
		ctx.arc(x,y,R,0,2*Math.PI);
		ctx.fillStyle = `rgb(${r},${g},${b})`;
		ctx.fill();
	}

	function rasstoyanie(i1, i2)
	{
		r_Toch = Math.sqrt((X_SQ_Center[i1]-X_SQ_Center[i2])**2 + (Y_SQ_Center[i1]-Y_SQ_Center[i2])**2);
	}
	function r_Prushiny(i1){
		r_Pr = Math.sqrt((X_SQ_Center[i1]-X_Nacahalo[i1])**2 + (Y_SQ_Center[i1]-Y_Nacahalo[i1])**2);
		return r_Pr;
	}
	function F_Lennard_Jones(i1,i2)
	{
		let z  = (12*D/da) * (0 - ((da/r_Toch)**13) + (da/r_Toch)**7);
		/*console.log(X_SQ_Center[i1]);
		console.log(X_SQ_Center[i2]);*/
		return z;
	}

	function a(i1,i2) {
		let Lennard_A = F_Lennard_Jones(i1, i2) / Mass[i1];
		return Lennard_A;
	}

	function V_Itog(i1,i2)
	{
		rasstoyanie(i1,i2);
		cosA = (Math.abs(X_SQ_Center[i1]-X_SQ_Center[i2]))/r_Toch;
		sinA = (Math.abs(Y_SQ_Center[i1]-Y_SQ_Center[i2]))/r_Toch;
		cosN = (Math.abs(X_SQ_Center[i1]-X_Nacahalo[i1])) / r_Prushiny(i1);
		sinN = (Math.abs(Y_SQ_Center[i1]-Y_Nacahalo[i1])) / r_Prushiny(i1);
		if (r_Prushiny(i1) == 0) {cosN = 0; sinN = 0;}
		adop = 0;
		
		//console.log(adop);
		AX_SQ_Center[i1] = -1 *(X_SQ_Center[i1] - X_SQ_Center[i2]+1)/Math.abs(X_SQ_Center[i1] - X_SQ_Center[i2]+1) * cosA * a(i1,i2) ;
		AY_SQ_Center[i1] = 1 *(Y_SQ_Center[i1] - Y_SQ_Center[i2]+1)/Math.abs(Y_SQ_Center[i1] - Y_SQ_Center[i2]+1) * sinA * a(i1,i2);
		if (i1 != 0) 
			{
				adop = (K_prushiny * r_Prushiny(i1)) /Mass[i1];
				AX_SQ_Center[i1] += cosN * (X_Nacahalo[i1] - X_SQ_Center[i1]+1) / Math.abs(X_Nacahalo[i1] - X_SQ_Center[i1]+1) * adop;
				AY_SQ_Center[i1] -= sinN * (Y_Nacahalo[i1] - Y_SQ_Center[i1]+1) / Math.abs(Y_Nacahalo[i1] - Y_SQ_Center[i1]+1) * adop;
				/*console.log(cosN);
				console.log(sinN);*/
		}
		if (AX_SQ_Center[i1] > Amax) {AX_SQ_Center[i1] = Amax;}
		if (AY_SQ_Center[i1] > Amax) {AY_SQ_Center[i1] = Amax;}

		VX_SQ_Center[i1] += AX_SQ_Center[i1] * DELTA;
		VY_SQ_Center[i1] += AY_SQ_Center[i1] * DELTA ;
		if (VX_SQ_Center[i1] > Vmax) {VX_SQ_Center[i1] = Vmax;}
		if (VY_SQ_Center[i1] > Vmax) {VY_SQ_Center[i1] = Vmax;} 
		/*console.log(VX_SQ_Center[i1]);
		console.log(VY_SQ_Center[i1]);
		console.log(/*VX_SQ_Center[i1]*cosA);
		console.log(X_SQ_Center[i1]-X_SQ_Center[i2]);
		console.log(Y_SQ_Center[i1]-Y_SQ_Center[i2]);
		console.log(/*VY_SQ_Center[i2]*sinA);
		console.log(r_Toch);*/
	}

	/*функция изменения координат(всех)*/
	function update(){

		//VY_Ball_Center -= g * 0.00001 ;

		for (let i = 0; i < Colvo_Kirpichey + 1; i++){
			X_SQ_Center_Prev[i] = X_SQ_Center[i];
			Y_SQ_Center_Prev[i] = Y_SQ_Center[i];
		}
		for (let i = 0; i < Colvo_Kirpichey + 1; i++) {
			for (let j = 0; j < Colvo_Kirpichey + 1; j++) {
				if (i == j) {continue;}
				V_Itog(j, i);
				if (VX_SQ_Center[j] > Vmax) {VX_SQ_Center[j] = Vmax;}
				if (VY_SQ_Center[j] > Vmax) {VY_SQ_Center[j] = Vmax;}
				//console.log(j,i);
				//console.log(VX_SQ_Center);
			}
			if (i == 0) 
				VY_SQ_Center[i] -= g * 0.00001; 
		}

		for (let i = 0; i < Colvo_Kirpichey + 1; i++) {
			X_SQ_Center[i] += VX_SQ_Center[i] * DELTA;
			Y_SQ_Center[i] -= VY_SQ_Center[i] * DELTA;

			/*console.log(X_SQ_Center[i]);
			console.log(X_SQ_Center[i]);*/
			//console.log(Y_SQ_Center);

			if (i == 0) {
		
				if ((Y_SQ_Center[i] + Radius_Main - h) >= 0) {
					VY_SQ_Center[i] = -1*VY_SQ_Center[i]*Koef_Otskoka;
					Y_SQ_Center[i] = h - Radius_Main - 1; 
				}

				if ((Y_SQ_Center[i] - Radius_Main) <= 0) {
					VY_SQ_Center[i] = -1*VY_SQ_Center[i]*Koef_Otskoka;
					Y_SQ_Center[i] = Radius_Main + 1; 
				}

				if ((X_SQ_Center[i] - Radius_Main) <= 0) {
					VX_SQ_Center[i] = -1*VX_SQ_Center[i]*Koef_Otskoka;
					X_SQ_Center[i] = Radius_Main + 1;
				}

				if ((X_SQ_Center[i]+ Radius_Main - w) >= 0) {
					VX_SQ_Center[i] = -1*VX_SQ_Center[i]*Koef_Otskoka;
					X_SQ_Center[i] = w - Radius_Main - 1; 
				}
			}
		}
	}


	/*рендер*/
	function render(){ 
		ctx.clearRect(0,0,w,h);
		
		for (let i = 0; i < Colvo_Kirpichey + 1; i++) {
			if (i == 0)
			{
				circle(X_SQ_Center[i], Y_SQ_Center[i], 230, 0, 0, Radius_Main);
				ctx.beginPath();
				ctx.strokeStyle = `rgb(${0},${255},${0})`;
				ctx.arc(X_SQ_Center[i],Y_SQ_Center[i],da,0,2*Math.PI);
				ctx.stroke();
				continue;
			}

			circle(X_SQ_Center[i], Y_SQ_Center[i], 0, 0, 0, Radius_Min);
			ctx.beginPath();
			ctx.strokeStyle = `rgb(${210},${210},${210})`;
			ctx.arc(X_SQ_Center[i],Y_SQ_Center[i],da,0,2*Math.PI);
			ctx.stroke();
			//ctx.beginPath();
			/*ctx.strokeStyle = `rgb(${255},${255},${0})`;
			ctx.arc(X_SQ_Center[i],Y_SQ_Center[i],R+da,0,2*Math.PI);*/
		}
		/*circle(X_Ball_Center, Y_Ball_Center, 0, 0, 0, Radius_Main);*/

		/*ctx.beginPath(); 
		ctx.moveTo(X_Ball_Center_Prev,Y_Ball_Center_Prev);
		ctx.lineTo(X_Ball_Center,Y_Ball_Center);
		ctx.stroke();*/

		

		/*console.log(X_Ball_Center);
		console.log(Y_Ball_Center);*/		
	}


	/*Рисую круг в самом начале, чтобы было хоть что-то ( на данный момент даже не думаю о стене)*/
	//circle(X_Ball_Center, Y_Ball_Center);
	circle(X_Ball_Center, Y_Ball_Center, 230, 0, 0, Radius_Main);
	ctx.beginPath();
	ctx.strokeStyle = `rgb(${0},${255},${0})`;
	ctx.arc(X_Ball_Center,Y_Ball_Center,da,0,2*Math.PI);
	ctx.stroke();

	if(flag_zadaniya_steny == 0)
			{
				for (let i = 0; i < Colvo_Kirpichey + 1; i++) {
					if (i == 0) {
						X_SQ_Center[i] = X_Ball_Center;
						Y_SQ_Center[i] = Y_Ball_Center;
						VY_SQ_Center[i] = 0;
						VX_SQ_Center[i] = 0;
						AX_SQ_Center[i] = 0;
						AX_SQ_Center[i] = 0;
						continue;
					}
					X_SQ_Center[i] =300 + s;
					X_Nacahalo[i] = 300 + s;
					Y_SQ_Center[i] = 50+ ca;
					Y_Nacahalo[i] = 50 + ca;
					circle(X_SQ_Center[i], Y_SQ_Center[i], 0, 0, 0, Radius_Min);
					ctx.beginPath();
					ctx.strokeStyle = `rgb(${210},${210},${210})`;
					ctx.arc(X_SQ_Center[i],Y_SQ_Center[i],da,0,2*Math.PI);
					ctx.stroke();
					s+= da + 10;
					count++;
					if(count >= 4)
					{
						count = 0;
						ca += da + 10;
						s = 0;
					}
					VY_SQ_Center[i] = 0;
					VX_SQ_Center[i] = 0;

					AX_SQ_Center[i] = 0;
					AX_SQ_Center[i] = 0;
				}
			}

	/*Все расчеты происходят после нажатия на кнопку GO*/
	button_inputGO.onclick = ()=>{
		if (flag_start == 0) {

			/*для возможности остановки отрисовки*/
			button_inputGO.value = 'STOP';
			flag_start = 1;

			let Mass_Chastic = button_inputMP.value;
			let Mass_Circle = button_inputMM.value;
			console.log(Mass_Circle);
			console.log(Mass_Chastic);
			if(flag_zadaniya_steny == 0)
			{
				for (let i = 0; i < Colvo_Kirpichey + 1; i++) {
					if (i == 0) {
						Mass[i] = Mass_Circle;
						continue;
					}
					Mass[i] = Mass_Chastic;
				}
			}
			Angle_Radian = button_inputAngle.value * (Math.PI / 180);
			Speed_metres_per_sec = button_inputSpeed.value * (Math.PI / 180);
			VX_Ball_Center = Math.cos(Angle_Radian)*Speed_metres_per_sec;
			VY_Ball_Center = Math.sin(Angle_Radian)*Speed_metres_per_sec;
			VX_SQ_Center[0] = Math.cos(Angle_Radian)*Speed_metres_per_sec;
			VY_SQ_Center[0] = Math.sin(Angle_Radian)*Speed_metres_per_sec;
			program = setInterval(()=>{
				update();
				render();
			}, 1000*deltaTime);
		}
		else
		{
			/*Остановка отрисовки*/
			clearInterval(program);

			/*Продолжение отрисовки*/
			flag_start = 0;
			button_inputGO.value = 'GO';
			flag_zadaniya_steny = 1;
		}
	}
}
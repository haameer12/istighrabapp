function register_notification_home() {
	var networkState = navigator.connection.type;
	if (networkState == Connection.NONE) {
	
	}
	else
	{
		var push = PushNotification.init({
			android: {
				senderID: "641879532575"
			},
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			windows: {}
		});

		push.on('registration', function(data) {
			// data.registrationId
			// alert("registration event: " + data.registrationId);
			$.ajax({ type: "POST",
					url: "http://istighrab.iicss.iq/app/set_phone_key.php",
					data: {regID : data.registrationId,user:window.localStorage.getItem('uuid'),OS:device.platform},
					async: false,
					success : function(text)
					{
						//last_articles_version = text;
						//console.log('SMGROUP ::::::::::::::::::::::::::::::::::::    Notification registration text : ' + text);
						window.localStorage.setItem('register_for_notifs','yes');
					}
			});
		});

		push.on('notification', function(data) {
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
			
			
			
			//window.alert("name : " +data.additionalData.name +" - sound : " +data.additionalData.sounda);
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//هنا نعالج الإشعار القادم و نحلله
			noty_button_function = "";
			if(data.additionalData.noty_type == 1){//zeara
				noty_button_function = "";
			}else if(data.additionalData.noty_type == 2 && data.additionalData.item_id > 0){//news
				noty_button_function = "get_news_item(" +data.additionalData.item_id +");";
			}else if(data.additionalData.noty_type == 3 && data.additionalData.hyperlink != '' && data.additionalData.hyperlink_target != ''){//open url
				noty_button_function = "openUrl('" +data.additionalData.hyperlink +"', '" +data.additionalData.hyperlink_target +"');";
			}

			
			
			
			
			var text_a = "<div class='noty-icon icon message message'>&nbsp;</div><div class='noty-close icon close message'>&nbsp;</div><div class='noty-text'><h4 class='noty-title'>" +data.title +"</h4>" +data.message +((noty_button_function != '')? " <a class='open_content_link' href='#' onclick=\"" +noty_button_function +"return false;\">" +((data.additionalData.button_text != "")? data.additionalData.button_text : "متابعة...") +"</a>" : "") +"</div>";
			notify(text_a, 'information', 30000, 'top', 'Left', 'Right');
			
			
			
			
			
			switch(data.additionalData.noty_sound){
				case "1" :
					noty_sound = "notify-sound1.mp3";
				break;
				case "2" :
					noty_sound = "notify-political-sec.mp3";
				break;
			}
			if(data.additionalData.noty_sound > 0 && data.additionalData.noty_sound < 8){
				// if the notification contains a soundname, play it.
				var my_media = new Media("/android_asset/www/sound/" +noty_sound);
				my_media.play();
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		});

		push.on('error', function(e) {
			// e.message
			// alert("push error = " + e.message);
		});
	}

}

function register_notification() {
	var networkState = navigator.connection.type;
	if (networkState == Connection.NONE) {
	
	}
	else
	{
		var push = PushNotification.init({
			android: {
				senderID: "1069136326484"
			},
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			windows: {}
		});

		push.on('registration', function(data) {
			// data.registrationId
			// alert("registration event: " + data.registrationId);
		});

		push.on('notification', function(data) {
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
			navigator.notification.alert(
				data.message,			// message
				notif_alertDismissed,	// callback
				'اطلاعیه',				// title
				'تائید'					// buttonName
			);
		});

		push.on('error', function(e) {
			// e.message
			// alert("push error = " + e.message);
		});
	}

}


//function notif_alertDismissed(){};
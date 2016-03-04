# APN server

If you would like to test out Apple Notifications with your iOS apps,
please read these comprehensive guides I wrote when I was trying to figure everything out:
<ul>
<li><a href="http://shanghaiseagull.com/index.php/2015/12/13/how-to-use-apn-notification-center/">APN notification center</a></li>
<li><a href="http://shanghaiseagull.com/index.php/2015/12/07/ios-apple-push-notification-server-side-using-node-apn/">server side</a></li>
<li><a href="http://shanghaiseagull.com/index.php/2015/12/03/ios-apple-push-notification-with-node-js-using-apnagent/">client side</a></li>
</ul>

Once you have your provisioning files in place, your .pem files, and all the resources set, you can finally proceed to:

<ol>
<li>run your server</li>
<li>run your iOS client to get a device ID</li>
<li>insert device ID into your server, and start sending notifications</li>
</ol>

<b> Run your iOS client app in order to get a device ID: </b>
<a href="http://shanghaiseagull.com/index.php/2015/12/03/ios-apple-push-notification-ios-client-explanation/">iOS client</a>

go to <a href="www.rickytsao.com/8888">www.rickytsao.com/8888</a>

Then, scroll down to the bottom of the page until you see 'Device Configuration'.
1) In the <b>Insert Device ID</b> textfield, copy and paste the device id I sent you.

2) Click on the insert button below

3) On the left hand side, you will see under <b>Device ID List</b> that the device id I gave you will appear. Click on the radio button to select it.

<a href="http://shanghaiseagull.com/wp-content/uploads/2015/12/insert-device.png"><img src="http://shanghaiseagull.com/wp-content/uploads/2015/12/insert-device.png" alt="insert-device" width="604" height="160" class="alignnone size-large wp-image-2947" /></a>


4) Then scroll to the top of the page to make sure that the device id in use matches yours.

<a href="http://shanghaiseagull.com/wp-content/uploads/2015/12/check-device.png"><img src="http://shanghaiseagull.com/wp-content/uploads/2015/12/check-device.png" alt="check-device" width="977" height="206" class="alignnone size-full wp-image-2946" /></a>



<h3>Sending Custom Notifications</h3>

UPDATED 3/3/2016:

New version conforms to project's need much better. Basically, for whatever notification you want to send, you have to build it by copy and pasting in data.

You copy and paste ALERT and PAYLOAD info into the textfields from sample text. Pay attention to some requirement details such as dates. 

<a href="http://shanghaiseagull.com/wp-content/uploads/2015/12/apn_server.png"><img src="http://shanghaiseagull.com/wp-content/uploads/2015/12/apn_server-726x1024.png" alt="apn_server" width="726" height="1024" class="alignnone size-large wp-image-3476" /></a>


Then you simply press the send button, and your iOS app will receive the notification. If you are working with the Apple Watch, make sure you sleep the iPhone as well as your watch. 

<a href="http://shanghaiseagull.com/wp-content/uploads/2015/12/notification_received.png"><img src="http://shanghaiseagull.com/wp-content/uploads/2015/12/notification_received-575x1024.png" alt="notification_received" width="575" height="1024" class="alignnone size-large wp-image-3480" /></a>


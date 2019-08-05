import LobWriteupPDF from './bin/attachments/LobWriteup.pdf';
import SafetyPennPDF from './bin/attachments/SafetyPennDocumentation.pdf';
import SPScreenshot1 from './bin/screenshots/safetypenn/sp_1.png';
import SPScreenshot2 from './bin/screenshots/safetypenn/sp_2.png';
import SPScreenshot3 from './bin/screenshots/safetypenn/sp_3.png';
import SPScreenshot4 from './bin/screenshots/safetypenn/sp_4.png';
import SPScreenshot5 from './bin/screenshots/safetypenn/sp_5.png';

function Model() {
	// Projects data
	const projects = [
		{
		  name: "Lob",
		  desc: "Lob presents an extensive variety of sports content, including game highlights, delivered in near real-time performance. Lob is currently a proof-of-concept iPhone app in private beta.",
		  buttons: [
			  { title: "Download on TestFlight", link: "https://testflight.apple.com/join/3kzhQoyV" },
			  { title: "GitHub", link: "https://github.com/ellbosch/Lob-iOS" },
			  { title: "Write-Up", link: LobWriteupPDF }
			]
		},
		{
		  name: "SwiftVid",
		  desc: "Inspired from Lob, SwiftVid is a framework that provides easier integration of videos into Swift projects. SwiftVid will launch soon.",
		  buttons: []
		},
		{
			name: "READit",
			desc: "READit is a mobile-optimized news aggregator powered by Reddit. Created in 2014, READit introduced a reader-friendly responsive UI missing on Reddit (at the time). In addition, READit automatically generates a 'TLDR' summary for each article using techniques in Natural Language Processing.",
			buttons: [
				{ title: "READit", link: "http://readit.elliotboschwitz.com" },
				{ title: "GitHub", link: "https://github.com/ellbosch/READit" }
			]

		},
		{
			name: "Socrates",
			desc: "Socrates is a Chrome extension that provides quick, detailed information in a convenient sidebar. Socrates works by immediately displaying a Wikipedia article or list of YouTube videos based on highlighted text from the user. The project was conceptualized at a PennApps hackathon in the fall of 2014 and we are still working on providing a wider breadth of online resources.",
			buttons: [
				{ title: "Hackathon", link: "http://challengepost.com/software/socrates-pufif" }
			]
		},
		{
			name: "SafetyPenn",
			desc: "SafetyPenn is an Android application for Penn students. This is a map-based application that supports security features by Penn Public Safety to help students walk about campus safely. This includes a user-set timer which, upon expiration, will send a distress signal to Penn Police, as well as a request for a Penn escort to walk the user home. For this app, I built support for all map-based features and helped design the UI.",
			buttons: [
				{ title: "GitHub", link: "https://github.com/alialtaf9/SafetyPenn" },
				{ title: "Documentation", link: SafetyPennPDF }
			],
			screenshots: [
				{ path: SPScreenshot1, desc: "The home screen contains a map on Penn's campus that prompts the user to initiate the timer.", alt: "SafetyPenn Home Page" },
				{ path: SPScreenshot2, desc: "The timer can be set either by manually entering a desired time or by automatically calculated walking time.", alt: "SafetyPenn Timer Feature" },
				{ path: SPScreenshot3, desc: "The user is directed to enter a destination for automatic timer calculation.", alt: "SafetyPenn Form for Destination" },
				{ path: SPScreenshot4, desc: "The app calculates a time and prompts the user to initiate the timer.", alt: "SafetyPenn Estimation ETA Feature" },
				{ path: SPScreenshot5, desc: "Penn Police gets directly notified in the event that the timer expires without the user disabling it.", alt: "SafetyPenn Penn Police Notification" }
			]	
		}
	]

	return { projects: projects }
}


export default Model;
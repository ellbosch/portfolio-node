import LobWriteupPdf from './bin/attachments/LobWriteup.pdf';

function Model() {
	// Projects data
	const projects = [
		{
		  name: "Lob",
		  desc: "Lob presents an extensive variety of sports content, including game highlights, delivered in near real-time performance. Lob is currently a proof-of-concept iPhone app in private beta.",
		  buttons: [
			  { title: "Download on TestFlight", link: "https://testflight.apple.com/join/3kzhQoyV" },
			  { title: "GitHub", link: "https://github.com/ellbosch/Lob-iOS" },
			  { title: "Write-Up", link: {LobWriteupPdf} }
			]
		},
		{
		  name: "SwiftVid",
		  desc: "Inspired from Lob, SwiftVid is a framework that provides easier integration of videos into Swift projects. SwiftVid will launch soon.",
		  buttons: []
		}
	]

	return { projects: projects }
}


export default Model;
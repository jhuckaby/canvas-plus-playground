// Test Definitions

module.exports = {
	
	tests: [
		{
			name: "Read/Write JPEG",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImtpdHRlbi5qcGcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=jpeg&q=90"
		},
		{
			name: "Read/Write PNG",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&f=png"
		},
		{
			name: "JPEG to PNG",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImtpdHRlbi5qcGcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=png"
		},
		{
			name: "PNG to JPEG",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&f=jpeg&q=90"
		},
		{
			name: "Resize Fit Best Quality",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=png"
		},
		{
			name: "Resize Fit Good Quality",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCIsImFudGlhbGlhcyI6Imdvb2QifQ%3D%3D&f=png"
		},
		{
			name: "Resize Fit Fast Quality",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCIsImFudGlhbGlhcyI6ImZhc3QifQ%3D%3D&f=png"
		},
		{
			name: "Resize Fit Nearest Quality",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCIsImFudGlhbGlhcyI6Im5lYXJlc3QifQ%3D%3D&f=png"
		},
		{
			name: "Resize FitPad Center",
			uri: "http://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMCwibW9kZSI6ImZpdHBhZCIsImJhY2tncm91bmQiOiIjZmYwMDAwIn0%3D&f=png"
		},
		{
			name: "Resize FitPad North",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMCwibW9kZSI6ImZpdHBhZCIsImJhY2tncm91bmQiOiIjMDBmZjAwIiwiZ3Jhdml0eSI6Im5vcnRoIn0%3D&f=png"
		},
		{
			name: "Resize FitPad South",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMCwibW9kZSI6ImZpdHBhZCIsImJhY2tncm91bmQiOiIjMDAwMGZmIiwiZ3Jhdml0eSI6InNvdXRoIn0%3D&f=png"
		},
		{
			name: "Resize FitPad West",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjEwMCwibW9kZSI6ImZpdHBhZCIsImJhY2tncm91bmQiOiIjMDAwMDAwIiwiZ3Jhdml0eSI6Indlc3QifQ%3D%3D&f=png"
		},
		{
			name: "Resize FitPad East",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjEwMCwibW9kZSI6ImZpdHBhZCIsImJhY2tncm91bmQiOiIjODg4ODg4IiwiZ3Jhdml0eSI6ImVhc3QifQ%3D%3D&f=png"
		},
		{
			name: "Resize FitOver Center",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjEwMCwibW9kZSI6ImZpdG92ZXIifQ%3D%3D&f=png"
		},
		{
			name: "Resize FitOver North",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjEwMCwibW9kZSI6ImZpdG92ZXIiLCJncmF2aXR5Ijoibm9ydGgifQ%3D%3D&f=png"
		},
		{
			name: "Resize FitOver South",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjEwMCwibW9kZSI6ImZpdG92ZXIiLCJncmF2aXR5Ijoic291dGgifQ%3D%3D&f=png"
		},
		{
			name: "Resize FitOver West",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjQwMCwibW9kZSI6ImZpdG92ZXIiLCJncmF2aXR5Ijoid2VzdCJ9&f=png"
		},
		{
			name: "Resize FitOver East",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjQwMCwibW9kZSI6ImZpdG92ZXIiLCJncmF2aXR5IjoiZWFzdCJ9&f=png"
		},
		{
			name: "Resize Scale",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6NDAwLCJoZWlnaHQiOjEwMCwibW9kZSI6InNjYWxlIn0%3D&f=png"
		},
		{
			name: "Resize Nearest Enlarge",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=resize/eyJ3aWR0aCI6MTI4LCJoZWlnaHQiOjEyOCwibW9kZSI6ImZpdCJ9&t=resize/eyJ3aWR0aCI6MjU2LCJoZWlnaHQiOjI1NiwibW9kZSI6ImZpdCIsImFudGlhbGlhcyI6Im5lYXJlc3QifQ%3D%3D&f=png"
		},
		{
			name: "JPEG 100%",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=jpeg&q=100"
		},
		{
			name: "JPEG 75%",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=jpeg&q=75"
		},
		{
			name: "JPEG 50%",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=jpeg&q=50"
		},
		{
			name: "JPEG 25%",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=jpeg&q=25"
		},
		{
			name: "JPEG 10%",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=jpeg&q=10"
		},
		{
			name: "PNG 24-bit",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=png"
		},
		{
			name: "Alpha PNG 32-bit",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=resize/eyJ3aWR0aCI6MTI4LCJoZWlnaHQiOjEyOCwibW9kZSI6ImZpdCJ9&f=png"
		},
		{
			name: "GIF (Opaque)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&f=gif"
		},
		{
			name: "GIF (Transparent)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=resize/eyJ3aWR0aCI6MTI4LCJoZWlnaHQiOjEyOCwibW9kZSI6ImZpdCJ9&f=gif"
		},
		{
			name: "Brightness Up",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJicmlnaHRuZXNzIjoxMjh9&f=png"
		},
		{
			name: "Brightness Down",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJicmlnaHRuZXNzIjotMTI4fQ%3D%3D&f=png"
		},
		{
			name: "Brightness Min",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJicmlnaHRuZXNzIjotMjU1fQ%3D%3D&f=png"
		},
		{
			name: "Brightness Max",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJicmlnaHRuZXNzIjoyNTV9&f=png"
		},
		{
			name: "Contrast Up",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJjb250cmFzdCI6MTI4fQ%3D%3D&f=png"
		},
		{
			name: "Contrast Down",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJjb250cmFzdCI6LTEyOH0%3D&f=png"
		},
		{
			name: "Contrast Min",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJjb250cmFzdCI6LTI1NX0%3D&f=png"
		},
		{
			name: "Contrast Max",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJjb250cmFzdCI6MjU1fQ%3D%3D&f=png"
		},
		{
			name: "Hue Shift Up",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJodWUiOjEyOH0%3D&f=png"
		},
		{
			name: "Hue Shift Down",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJodWUiOi0xMjh9&f=png"
		},
		{
			name: "Saturation Up",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJzYXR1cmF0aW9uIjoxMjh9&f=png"
		},
		{
			name: "Saturation Down",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJzYXR1cmF0aW9uIjotMTI4fQ%3D%3D&f=png"
		},
		{
			name: "Saturation Min",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJzYXR1cmF0aW9uIjotMjU1fQ%3D%3D&f=png"
		},
		{
			name: "Saturation Max",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJzYXR1cmF0aW9uIjoyNTV9&f=png"
		},
		{
			name: "Blur",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=blur/eyJhbW91bnQiOjEwfQ%3D%3D&f=png"
		},
		{
			name: "Border Outside",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=border/eyJzaXplIjoyMCwibW9kZSI6Im91dHNpZGUifQ%3D%3D&f=png"
		},
		{
			name: "Border Inside",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=border/eyJzaXplIjoyMCwiY29sb3IiOiIjMDBmZjAwIn0%3D&f=png"
		},
		{
			name: "Border Center",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=border/eyJzaXplIjoyMCwiY29sb3IiOiIjMDAwMGZmIiwibW9kZSI6ImNlbnRlciJ9&f=png"
		},
		{
			name: "Composite",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=composite/e30%3D&f=png"
		},
		{
			name: "Convolve",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=convolve/eyJtYXRyaXgiOlswLC0xLDAsLTEsNSwtMSwwLC0xLDBdfQ%3D%3D&f=png"
		},
		{
			name: "Crop",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/e30%3D&t=resize/eyJ3aWR0aCI6MjU2LCJoZWlnaHQiOjI1NiwibW9kZSI6ImZpdCJ9&t=crop/eyJ4Ijo1OCwieSI6ODEsIndpZHRoIjoxNDAsImhlaWdodCI6MTQwfQ%3D%3D&f=png"
		},
		{
			name: "Curves (Baseline)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlswLDI1NV19&f=png"
		},
		{
			name: "Curves (Increase brightness)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOls2MywyNTVdfQ%3D%3D&f=png"
		},
		{
			name: "Curves (Decrease brightness)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlswLDEyN119&f=png"
		},
		{
			name: "Curves (Increase contrast)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlswLDAsMjU1LDI1NV19&f=png"
		},
		{
			name: "Curves (Decrease contrast)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOls2MywxOTFdfQ%3D%3D&f=png"
		},
		{
			name: "Curves (Increase mid-tones)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlswLDE5MSwyNTVdfQ%3D%3D&f=png"
		},
		{
			name: "Curves (Decrease mid-tones)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlswLDYzLDI1NV19&f=png"
		},
		{
			name: "Curves (Increase shadow detail)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlswLDk2LDE2MCwyMTYsMjU1XX0%3D&f=png"
		},
		{
			name: "Curves (Invert image)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlsyNTUsMF19&f=png"
		},
		{
			name: "Curves (Solarize effect)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlswLDEyNywwXX0%3D&f=png"
		},
		{
			name: "Curves (Alice in Wonderland)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=curves/eyJwb2ludHMiOlswLDI1NSwwLDI1NV19&f=png"
		},
		{
			name: "Desaturate",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=desaturate/e30%3D&f=png"
		},
		{
			name: "Emboss",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=emboss/e30%3D&f=png"
		},
		{
			name: "Expand (Transparent)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=expand/eyJ3aWR0aCI6NTAsImhlaWdodCI6NTAsImJhY2tncm91bmQiOiJyZ2JhKDAsIDAsIDAsIDApIiwiZ3Jhdml0eSI6ImNlbnRlciJ9&f=png"
		},
		{
			name: "Expand (Color)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=expand/eyJ3aWR0aCI6NTAsImhlaWdodCI6NTAsImJhY2tncm91bmQiOiIjZmYwMGZmIiwiZ3Jhdml0eSI6ImNlbnRlciJ9&f=png"
		},
		{
			name: "Find Edges",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=findEdges/e30%3D&f=png"
		},
		{
			name: "Flatten (Transparent)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/e30%3D&t=resize/eyJ3aWR0aCI6MjU2LCJoZWlnaHQiOjI1NiwibW9kZSI6ImZpdCJ9&t=flatten/eyJiYWNrZ3JvdW5kIjoiIn0%3D&f=png"
		},
		{
			name: "Flatten (White)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/e30%3D&t=resize/eyJ3aWR0aCI6MjU2LCJoZWlnaHQiOjI1NiwibW9kZSI6ImZpdCJ9&t=flatten/eyJiYWNrZ3JvdW5kIjoiI2ZmZmZmZiJ9&f=png"
		},
		{
			name: "Gamma 0.25",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=gamma/eyJhbW91bnQiOjAuMjV9&f=png"
		},
		{
			name: "Gamma 1.0 (Baseline)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=gamma/e30%3D&f=png"
		},
		{
			name: "Gamma 2.2",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=gamma/eyJhbW91bnQiOjIuMn0%3D&f=png"
		},
		{
			name: "Gamma 4.0",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=gamma/eyJhbW91bnQiOjR9&f=png"
		},
		{
			name: "Gamma (Single Channel)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=gamma/eyJhbW91bnQiOjAuMjUsImNoYW5uZWxzIjoiciJ9&f=png"
		},
		{
			name: "Gaussian Blur",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=gaussianBlur/eyJhbW91bnQiOjZ9&f=png"
		},
		{
			name: "Invert",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=invert/e30%3D&f=png"
		},
		{
			name: "Invert (Single Channel)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=invert/eyJjaGFubmVscyI6InIifQ%3D%3D&f=png"
		},
		{
			name: "Invert (Alpha)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYmEtcmFtcC5wbmcifQ%3D%3D&t=invert/eyJjaGFubmVscyI6ImEifQ%3D%3D&f=png"
		},
		{
			name: "Mask",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=mask/e30%3D&f=png"
		},
		{
			name: "Normalize",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImtpdHRlbi5qcGcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=adjust/eyJjb250cmFzdCI6LTEyOH0%3D&t=normalize/e30%3D&f=png"
		},
		{
			name: "Opacity (Baseline)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRyZWUucG5nIn0%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=opacity/e30%3D&f=png"
		},
		{
			name: "Opacity (Half)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRyZWUucG5nIn0%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=opacity/eyJvcGFjaXR5IjowLjV9&f=png"
		},
		{
			name: "Opacity (None)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRyZWUucG5nIn0%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=opacity/eyJvcGFjaXR5IjowfQ%3D%3D&f=png"
		},
		{
			name: "Posterize (4 Levels)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=posterize/e30%3D&f=png"
		},
		{
			name: "Posterize (8 Levels)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=posterize/eyJsZXZlbHMiOjh9&f=png"
		},
		{
			name: "Quantize (32 Colors Dither)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=quantize/eyJjb2xvcnMiOjMyLCJkaXRoZXIiOnRydWV9&f=png"
		},
		{
			name: "Quantize (32 Colors Flat)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=quantize/eyJjb2xvcnMiOjMyLCJkaXRoZXIiOmZhbHNlLCJkaXRoZXJUeXBlIjoiIn0%3D&f=png"
		},
		{
			name: "Quantize (8 Colors Alpha)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=quantize/eyJjb2xvcnMiOjgsImRpdGhlciI6dHJ1ZX0%3D&f=png"
		},
		{
			name: "Quantize Fast (6 Levels Dither)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=quantizeFast/eyJjcnVzaFJHQiI6NiwiY3J1c2hBbHBoYSI6NiwiZGl0aGVyIjp0cnVlfQ%3D%3D&f=png"
		},
		{
			name: "Quantize Fast (6 Levels Flat)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=quantizeFast/eyJjcnVzaFJHQiI6NiwiY3J1c2hBbHBoYSI6NiwiZGl0aGVyIjpmYWxzZX0%3D&f=png"
		},
		{
			name: "Quantize Fast (Alpha Dither)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYmEtcmFtcC5wbmcifQ%3D%3D&t=quantizeFast/eyJjcnVzaFJHQiI6NiwiY3J1c2hBbHBoYSI6NiwiZGl0aGVyIjp0cnVlfQ%3D%3D&f=png"
		},
		{
			name: "Quantize Fast (1 Level)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=quantizeFast/eyJjcnVzaFJHQiI6MSwiY3J1c2hBbHBoYSI6MSwiZGl0aGVyIjp0cnVlfQ%3D%3D&f=png"
		},
		{
			name: "Sepia Tone",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=sepia/e30%3D&f=png"
		},
		{
			name: "Sharpen",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=sharpen/e30%3D&f=png"
		},
		{
			name: "Solarize",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=solarize/e30%3D&f=png"
		},
		{
			name: "Color Temperature (Warm)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=temperature/eyJhbW91bnQiOjEyOH0%3D&f=png"
		},
		{
			name: "Color Temperature (Cool)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=temperature/eyJhbW91bnQiOi0xMjh9&f=png"
		},
		{
			name: "Text (Basic)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MjgwLCJoZWlnaHQiOjMyLCJiYWNrZ3JvdW5kIjoiI2ZmZmZmZiJ9&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4uIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTQsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJjZW50ZXIiLCJvdmVyZmxvdyI6IiJ9&f=png"
		},
		{
			name: "Text (Transparent Background)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MjgwLCJoZWlnaHQiOjMyfQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4uIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTQsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJjZW50ZXIiLCJvdmVyZmxvdyI6IiJ9&f=png"
		},
		{
			name: "Text (Shrink)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MjgwLCJoZWlnaHQiOjMyLCJiYWNrZ3JvdW5kIjoiI2ZmZmZmZiJ9&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTQsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJjZW50ZXIiLCJtYXJnaW5YIjoxMH0%3D&f=png"
		},
		{
			name: "Text (Wrap)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjIwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuICBUaGUgcXVpY2sgYnJvd24gZm94IGp1bXBzIG92ZXIgdGhlIGxhenkgZG9nLiAgR3J1bXB5IFdpemFyZHMgbWFrZSB0b3hpYyBicmV3IGZvciB0aGUgRXZpbCBRdWVlbiBhbmQgSmFjay4gIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4iLCJmb250IjoiQXJpYWwiLCJzaXplIjoxNCwiY29sb3IiOiIjMDAwMDAwIiwiZ3Jhdml0eSI6Im5vcnRod2VzdCIsIm92ZXJmbG93Ijoid3JhcCIsIm1hcmdpblgiOjEwLCJtYXJnaW5ZIjoxMH0%3D&f=png"
		},
		{
			name: "Text (Shrink Wrap)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjIwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuICBUaGUgcXVpY2sgYnJvd24gZm94IGp1bXBzIG92ZXIgdGhlIGxhenkgZG9nLiAgR3J1bXB5IFdpemFyZHMgbWFrZSB0b3hpYyBicmV3IGZvciB0aGUgRXZpbCBRdWVlbiBhbmQgSmFjay4gIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4iLCJmb250IjoiQXJpYWwiLCJzaXplIjoxOCwiY29sb3IiOiIjMDAwMDAwIiwiZ3Jhdml0eSI6Im5vcnRod2VzdCIsIm92ZXJmbG93Ijoic2hyaW5rd3JhcCIsIm1hcmdpblgiOjEwLCJtYXJnaW5ZIjoxMH0%3D&f=png"
		},
		{
			name: "Text (Outline)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImtpdHRlbi5qcGcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=text/eyJ0ZXh0IjoiQ09PTCBLSVRURU4gQlJPIiwiZm9udCI6IkFyaWFsIE5hcnJvdyIsImZvbnRXZWlnaHQiOiJib2xkIiwic2l6ZSI6NDgsImNvbG9yIjoiI2ZmZmZmZiIsImdyYXZpdHkiOiJzb3V0aCIsIm1hcmdpblgiOjEwLCJtYXJnaW5ZIjoxMCwib3V0bGluZUNvbG9yIjoiIzAwMDAwMCIsIm91dGxpbmVUaGlja25lc3MiOjR9&f=png"
		},
		{
			name: "Text (Wide Character Spacing)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTgsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJub3J0aHdlc3QiLCJvdmVyZmxvdyI6IndyYXAiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTAsImNoYXJhY3RlclNwYWNpbmciOjN9&f=png"
		},
		{
			name: "Text (Narrow Character Spacing)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTgsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJub3J0aHdlc3QiLCJvdmVyZmxvdyI6IndyYXAiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTAsImNoYXJhY3RlclNwYWNpbmciOi0xfQ%3D%3D&f=png"
		},
		{
			name: "Text (Tall Line Height)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTgsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJub3J0aHdlc3QiLCJvdmVyZmxvdyI6InNocmlua3dyYXAiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTAsImxpbmVTcGFjaW5nIjoxMH0%3D&f=png"
		},
		{
			name: "Text (Short Line Height)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTgsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJub3J0aHdlc3QiLCJvdmVyZmxvdyI6IndyYXAiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTAsImxpbmVTcGFjaW5nIjotNX0%3D&f=png"
		},
		{
			name: "Text (Align Northwest)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5Ijoibm9ydGh3ZXN0Iiwib3ZlcmZsb3ciOiIiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTB9&f=png"
		},
		{
			name: "Text (Align North)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5Ijoibm9ydGgiLCJvdmVyZmxvdyI6IiIsIm1hcmdpblgiOjEwLCJtYXJnaW5ZIjoxMH0%3D&f=png"
		},
		{
			name: "Text (Align Northeast)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5Ijoibm9ydGhlYXN0Iiwib3ZlcmZsb3ciOiIiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTB9&f=png"
		},
		{
			name: "Text (Align East)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5IjoiZWFzdCIsIm92ZXJmbG93IjoiIiwibWFyZ2luWCI6MTAsIm1hcmdpblkiOjEwfQ%3D%3D&f=png"
		},
		{
			name: "Text (Align Southeast)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5Ijoic291dGhlYXN0Iiwib3ZlcmZsb3ciOiIiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTB9&f=png"
		},
		{
			name: "Text (Align South)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5Ijoic291dGgiLCJvdmVyZmxvdyI6IiIsIm1hcmdpblgiOjEwLCJtYXJnaW5ZIjoxMH0%3D&f=png"
		},
		{
			name: "Text (Align Southwest)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5Ijoic291dGh3ZXN0Iiwib3ZlcmZsb3ciOiIiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTB9&f=png"
		},
		{
			name: "Text (Align West)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5Ijoid2VzdCIsIm92ZXJmbG93IjoiIiwibWFyZ2luWCI6MTAsIm1hcmdpblkiOjEwfQ%3D%3D&f=png"
		},
		{
			name: "Text (Align Center)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lLiIsImZvbnQiOiJBcmlhbCIsInNpemUiOjE4LCJjb2xvciI6IiMwMDAwMDAiLCJncmF2aXR5IjoiY2VudGVyIiwib3ZlcmZsb3ciOiIiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTB9&f=png"
		},
		{
			name: "Text (Color)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTgsImNvbG9yIjoiI2ZmMDAwMCIsImdyYXZpdHkiOiJub3J0aHdlc3QiLCJvdmVyZmxvdyI6IndyYXAiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTB9&f=png"
		},
		{
			name: "Text (Background Color)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTgsImNvbG9yIjoiI2ZmMDAwMCIsImJhY2tncm91bmQiOiIjZmZmZjAwIiwiZ3Jhdml0eSI6Im5vcnRod2VzdCIsIm92ZXJmbG93Ijoid3JhcCIsIm1hcmdpblgiOjEwLCJtYXJnaW5ZIjoxMH0%3D&f=png"
		},
		{
			name: "Text (Opacity)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTgsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJub3J0aHdlc3QiLCJvdmVyZmxvdyI6IndyYXAiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTAsIm9wYWNpdHkiOjAuNX0%3D&f=png"
		},
		{
			name: "Text (Shadow)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=create/eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjEwMCwiYmFja2dyb3VuZCI6IiNmZmZmZmYifQ%3D%3D&t=text/eyJ0ZXh0IjoiTm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBtZW4gdG8gY29tZSB0byB0aGUgYWlkIG9mIHRoZWlyIGNvdW50cnkuIiwiZm9udCI6IkFyaWFsIiwic2l6ZSI6MTgsImNvbG9yIjoiIzAwMDAwMCIsImdyYXZpdHkiOiJub3J0aHdlc3QiLCJvdmVyZmxvdyI6IndyYXAiLCJtYXJnaW5YIjoxMCwibWFyZ2luWSI6MTAsInNoYWRvd0NvbG9yIjoiIzAwMDAwMCIsInNoYWRvd09mZnNldFgiOjIsInNoYWRvd09mZnNldFkiOjIsInNoYWRvd0JsdXIiOjV9&f=png"
		},
		{
			name: "Threshold (Color)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InJnYi1yYW1wLnBuZyJ9&t=threshold/e30%3D&f=png"
		},
		{
			name: "Threshold (Black & White)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRyZWUucG5nIn0%3D&t=resize/eyJ3aWR0aCI6MzIwLCJoZWlnaHQiOjI0MCwibW9kZSI6ImZpdCJ9&t=desaturate/e30%3D&t=threshold/e30%3D&t=flatten/eyJiYWNrZ3JvdW5kIjoiIzg4ODg4OCJ9&f=png"
		},
		{
			name: "Rotate 45 (Expand)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MTYwLCJoZWlnaHQiOjEyMCwibW9kZSI6ImZpdCJ9&t=transform/eyJyb3RhdGUiOjQ1fQ%3D%3D&f=png"
		},
		{
			name: "Rotate 45 (Fixed)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MTYwLCJoZWlnaHQiOjEyMCwibW9kZSI6ImZpdCJ9&t=transform/eyJyb3RhdGUiOjQ1LCJmaXhlZCI6dHJ1ZX0%3D&f=png"
		},
		{
			name: "Rotate 45 (Color)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6InRlc3QtcGF0dGVybi5wbmcifQ%3D%3D&t=resize/eyJ3aWR0aCI6MTYwLCJoZWlnaHQiOjEyMCwibW9kZSI6ImZpdCJ9&t=transform/eyJyb3RhdGUiOjQ1LCJiYWNrZ3JvdW5kIjoiIzAwODgwMCJ9&f=png"
		},
		{
			name: "Rotate 45 Nearest",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=transform/eyJhbnRpYWxpYXMiOiJuZWFyZXN0Iiwicm90YXRlIjo0NSwiZml4ZWQiOnRydWV9&f=png"
		},
		{
			name: "Flip Horizontal",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=transform/eyJmbGlwaCI6dHJ1ZX0%3D&f=png"
		},
		{
			name: "Flip Vertical",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=transform/eyJmbGlwdiI6dHJ1ZX0%3D&f=png"
		},
		{
			name: "Matrix 3x3",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=transform/eyJtYXRyaXgiOlsxLDAsMSwxLDAsMF19&f=png"
		},
		{
			name: "Trim Edges",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=trim/eyJ0b2xlcmFuY2UiOjB9&f=png"
		},
		{
			name: "Trim Edges (Tolerance 50)",
			uri: "https://jhuckaby.github.io/canvas-plus-playground/?t=load/eyJpbWFnZSI6ImVhcnRoLWJhbGwucG5nIn0%3D&t=trim/eyJ0b2xlcmFuY2UiOjUwfQ%3D%3D&f=png"
		}
	]
	
};

import React, { useState } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	Card,
	CardContent,
	Grid,
} from "@mui/material";
import { logEvent } from "../../logging-middleware/log"; // adjust path as needed

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaGFpdGFueWEuamdzQGdtYWlsLmNvbSIsImV4cCI6MTc1MjA0MjMwOCwiaWF0IjoxNzUyMDQxNDA4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDgzOGI0YmQtMGZkZi00NTgwLThjNjEtZGRkNGZhMzM5NWM3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiaGFyaWthdGhhIGtyaXNobmEgY2hhaXRhbnlhIiwic3ViIjoiYzgwZWI3NDYtNzI2Mi00MDgwLTlkMGQtZjE2OWM2YThjMGIyIn0sImVtYWlsIjoiY2hhaXRhbnlhLmpnc0BnbWFpbC5jb20iLCJuYW1lIjoiaGFyaWthdGhhIGtyaXNobmEgY2hhaXRhbnlhIiwicm9sbE5vIjoiMjJqNDFhMDVtOCIsImFjY2Vzc0NvZGUiOiJlZVdFcngiLCJjbGllbnRJRCI6ImM4MGViNzQ2LTcyNjItNDA4MC05ZDBkLWYxNjljNmE4YzBiMiIsImNsaWVudFNlY3JldCI6IkhSR2p6WFFUUHJmWlVwbk0ifQ.wwNkDbYrGEIF2oYCbHc4OPhtISkHQbTtzWp8N1Fxllw";

export default function App() {
	const [urls, setUrls] = useState([
		{ longUrl: "", validity: "", shortcode: "" },
	]);
	const [results, setResults] = useState([]);

	const handleChange = (index, field, value) => {
		const updated = [...urls];
		updated[index][field] = value;
		setUrls(updated);
	};

	const addUrl = () => {
		if (urls.length < 5) {
			setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
		}
	};

	const handleSubmit = () => {
		urls.forEach((url) => {
			const { longUrl, validity, shortcode } = url;

			if (!longUrl.startsWith("http")) {
				alert("Invalid URL format");
				logEvent("error", "component", "Invalid URL format", token);
				return;
			}

			logEvent("info", "component", `Shortening: ${longUrl}`, token);

			const expiry = new Date(
				Date.now() + (validity ? parseInt(validity) : 30) * 60000
			);
			const shortCode = shortcode || Math.random().toString(36).slice(2, 7);

			const newEntry = {
				longUrl,
				shortcode: shortCode,
				expiryTime: expiry.toLocaleString(),
			};

			setResults((prev) => [...prev, newEntry]);

			logEvent("info", "component", "Shortened successfully", token);
		});
	};

	return (
		<Container maxWidth="md" sx={{ mt: 4 }}>
			<Typography variant="h4" gutterBottom>
				URL Shortener (Max 5 URLs)
			</Typography>

			{urls.map((url, idx) => (
				<Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Long URL"
							value={url.longUrl}
							onChange={(e) => handleChange(idx, "longUrl", e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							fullWidth
							label="Validity (min)"
							type="number"
							value={url.validity}
							onChange={(e) => handleChange(idx, "validity", e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							fullWidth
							label="Custom Shortcode"
							value={url.shortcode}
							onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
						/>
					</Grid>
				</Grid>
			))}

			<Button
				variant="contained"
				sx={{ mr: 2 }}
				onClick={addUrl}
				disabled={urls.length >= 5}
			>
				+ Add
			</Button>
			<Button variant="contained" onClick={handleSubmit}>
				Shorten
			</Button>

			<Typography variant="h5" sx={{ mt: 4 }}>
				Results
			</Typography>

			{results.map((r, idx) => (
				<Card key={idx} sx={{ my: 2 }}>
					<CardContent>
						<Typography>
							<strong>Original:</strong> {r.longUrl}
						</Typography>
						<Typography>
							<strong>Shortcode:</strong> {r.shortcode}
						</Typography>
						<Typography>
							<strong>Expires At:</strong> {r.expiryTime}
						</Typography>
						<Button
							variant="outlined"
							href={r.longUrl}
							target="_blank"
							rel="noopener noreferrer"
							sx={{ mt: 1 }}
						>
							Go to Link
						</Button>
					</CardContent>
				</Card>
			))}
		</Container>
	);
}

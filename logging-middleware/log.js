// logging-middleware/log.js
export async function logEvent(level, pkg, message, token) {
	try {
		await fetch("http://29.244.56.144/evaluation-service/logs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				stack: "frontend",
				level,
				package: pkg,
				message,
			}),
		});
	} catch (err) {
		console.error("Logging failed:", err);
	}
}

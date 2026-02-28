const testLogin = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/auth/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "admin@test.com",
                password: "admin123"
            })
        });

        const text = await response.text();
        console.log("Status:", response.status);
        console.log("Raw Response Text:", text);
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

testLogin();

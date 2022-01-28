import bcrypt from "bcrypt";
import client from "../../client";

export default {
	Mutation: {
		createAccount: async (
			_,
			{ username, name, location, email, password, avartarURL, githubUsername },
		) => {
			try {
				const existingUser = await client.user.findFirst({
					where: {
						OR: [
							{
								username,
							},
							{
								email,
							},
						],
					},
				});
				if (existingUser) {
					throw new Error("This username/password is already taken.");
				}
				const uglyPassword = await bcrypt.hash(password, 10);
				return client.user.create({
					data: {
						username,
						name,
						location,
						email,
						password: uglyPassword,
						avartarURL,
						githubUsername,
					},
				});
			} catch (e) {
				return e;
			}
		},
	},
};

import { useState } from "react";
import Form from "./form-wrapper";
import InputField from "./input-field";

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginSnippet() {
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof LoginFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      console.log("submit", form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Sign in</h2>
      <Form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="Enter your business email"
          hint="Use the email tied to your admin account."
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange("password")}
          placeholder="Enter your password"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full h-12 rounded-xl bg-[#12033A] text-white text-sm font-semibold transition hover:bg-[#0e0b31] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </Form>
    </div>
  );
}

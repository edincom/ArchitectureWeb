import { createAsync, createAsyncStore, useSubmission } from "@solidjs/router";
import { getUserInfo, updateUserInfoAction } from "~/lib/server";
import Layout from "~/components/Layout";
import { getUser } from "~/lib/session/session";

export default function Profile() {
  const user = createAsync(() => getUser());
  const mail = () => user()?.email;
  const userInfo = createAsyncStore(() => getUserInfo(mail()), {
    initialValue: null,
  });
  const updating = useSubmission(updateUserInfoAction);

  return (
    <Layout protected>
      <main class="mx-auto text-gray-700 p-6 max-w-lg bg-white shadow-xl rounded-2xl">
        <h1 class="text-4xl text-sky-600 font-light uppercase mb-10 text-center">Profile</h1>

        <form method="post" action={updateUserInfoAction} class="space-y-6">
          <input type="hidden" name="email" value={mail()} />

          <div>
            <label class="block text-sm font-semibold text-gray-600 mb-1">Phone</label>
            <input
              name="phone"
              value={userInfo()?.phone || ""}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-600 mb-1">Name</label>
            <input
              name="name"
              value={userInfo()?.name || ""}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-600 mb-1">Profession</label>
            <input
              name="profession"
              value={userInfo()?.profession || ""}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-sm"
            />
          </div>

          <div class="text-center pt-4">
            <button
              type="submit"
              class="rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 shadow-md transition duration-200"
              disabled={updating.pending}
            >
              {updating.pending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
}

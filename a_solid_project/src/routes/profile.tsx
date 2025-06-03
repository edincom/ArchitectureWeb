import { createAsync, createAsyncStore, useSubmission } from "@solidjs/router";
import { getUserInfo, updateUserInfoAction } from "~/cards/flashcards";
import Layout from "~/components/Layout";
import { getUser } from "~/session/session";


export default function Profile() {
  const user = createAsync(() => getUser());
  const mail = () => user()?.email
  const userInfo = createAsyncStore(() => getUserInfo(mail()), {
    initialValue: null
  });
  const updating = useSubmission(updateUserInfoAction)

  return (
    <Layout protected>
      <main class="text-center mx-auto text-gray-700 p-4 max-w-md">
        <h1 class="text-4xl text-sky-700 font-semibold uppercase mb-8">Profile</h1>

        <form method="post" action={updateUserInfoAction} class="space-y-4">
          <input type="hidden" name="email" value={mail()} />

          <div class="text-left">
            <label class="block text-sm font-medium text-gray-600">Phone</label>
            <input
              name="phone"
              value={userInfo()?.phone || ""}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 px-3 py-2"
            />
          </div>

          <div class="text-left">
            <label class="block text-sm font-medium text-gray-600">Name</label>
            <input
              name="name"
              value={userInfo()?.name || ""}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 px-3 py-2"
            />
          </div>

          <div class="text-left">
            <label class="block text-sm font-medium text-gray-600">Profession</label>
            <input
              name="profession"
              value={userInfo()?.profession || ""}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 px-3 py-2"
            />
          </div>

          <div class="text-center">
            <button
              type="submit"
              class="mt-4 inline-block rounded-full bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 transition-all shadow-md"
            >
                {updating.pending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
}
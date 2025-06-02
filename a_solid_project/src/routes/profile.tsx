import { createAsync, createAsyncStore } from "@solidjs/router";
import { getUserInfo } from "~/cards/flashcards";
import Layout from "~/components/Layout";
import { getUser } from "~/session/session";


export default function Profile() {
  const user = createAsync(() => getUser());
  const mail = () => user()?.email


  const userInfo = createAsyncStore(() => getUserInfo(mail()), {
    initialValue: null
  });

  console.log(userInfo())

  return (
    <Layout protected>
      <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Profile</h1>
        <a>{userInfo()?.phone}</a>
        <a>   </a>
        <a>{userInfo()?.name}</a>
        <a>   </a>
        <a>{userInfo()?.profession}</a>
      </main>
    </Layout>

  );
}
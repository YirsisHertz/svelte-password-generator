<script lang="ts">
  import Swal from "sweetalert2";

  import { GenerateParamsDatasourceAdapter } from "../../adapters/datasource";
  import { PasswordGeneratorModel } from "../../infrastructure/models/passwordGenerator.model";
  import { GeneratePasswordUseCase } from "../../usecases/generatePassword.usecase";

  let passwordValue = "";
  let lengthValue = 6;
  let lettersValue = true;
  let numbersValue = false;
  let symbolsValue = false;

  const createPassword = () => {
    try {
      const params = GenerateParamsDatasourceAdapter({
        length: lengthValue,
        letters: lettersValue,
        numbers: numbersValue,
        symbols: symbolsValue
      });

      const password = new GeneratePasswordUseCase(
        new PasswordGeneratorModel()
      ).execute(params);

      passwordValue = password;
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
      passwordValue = "";
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    if (!navigator.clipboard)
      return Swal.fire(
        "Error",
        "Navigator is not compatible with the clipboard",
        "error"
      );

    await navigator.clipboard.writeText(passwordValue);

    if (!passwordValue) {
      return;
    }

    Swal.fire({
      icon: "success",
      position: "top-end",
      showConfirmButton: false,
      text: "Your password is copy to clipboard correctly",
      timer: 3000,
      timerProgressBar: true,
      title: "Success",
      toast: true
    });
  };
</script>

<section>
  <form on:submit|preventDefault={createPassword} class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-2">
      <label class="font-bold text-xl" for="password">Password</label>
      <input
        type="text"
        class="w-full rounded-md bg-stone-200 px-20 py-1 text-center font-extrabold"
        disabled
        placeholder="Your password"
        value={passwordValue}
      />
      {#if passwordValue}
        <button
          on:click={copyToClipboard}
          type="button"
          class="w-full rounded-md bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 px-20 py-1 text-center font-extrabold"
        >
          Copy
        </button>
      {/if}
    </div>

    <div class="flex flex-row items-center gap-2">
      <input
        type="checkbox"
        class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        bind:checked={lettersValue}
      />
      <label class="font-bold text-xl" for="letters">Letters</label>
    </div>

    <div class="flex flex-row items-center gap-2">
      <input
        type="checkbox"
        class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        bind:checked={numbersValue}
      />
      <label class="font-bold text-xl" for="letters">Numbers</label>
    </div>

    <div class="flex flex-row items-center gap-2">
      <input
        type="checkbox"
        class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        bind:checked={symbolsValue}
      />
      <label class="font-bold text-xl" for="letters">Symbols</label>
    </div>

    <div class="flex flex-row justify-between items-center gap-2">
      <label class="font-bold text-xl" for="letters">Length</label>

      <input type="range" min="6" max="30" bind:value={lengthValue} />

      <span>{lengthValue}</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <button
        class="w-full rounded-md bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-20 py-1 text-center font-bold"
        type="submit"
      >
        Generate
      </button>
    </div>
  </form>
</section>

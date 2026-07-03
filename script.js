const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
});

menu?.addEventListener("click", () => {
  header?.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => header?.classList.remove("open"));
});

const flowData = {
  deposit: {
    number: "01",
    title: "Deposit creates a private note.",
    text: "The desktop creates private note data locally, publishes only a commitment to the Soroban mixer contract, and stores the full note in the encrypted local vault.",
    points: [
      "Creates note data locally",
      "Publishes a public commitment on-chain",
      "Keeps plaintext note contents on the device"
    ]
  },
  transfer: {
    number: "02",
    title: "Private transfer creates a recipient note.",
    text: "The sender proves ownership of input notes, encrypts a new note to the recipient Mixer Identity, and can return change as another private note.",
    points: [
      "Consumes one or more input notes privately",
      "Creates a recipient note that only the recipient can use",
      "Can produce private change back to the sender"
    ]
  },
  withdraw: {
    number: "03",
    title: "Withdraw without linking back to the original deposit.",
    text: "The client retrieves Merkle-path data, proves note ownership and nullifier correctness, wraps the receipt, and submits a verified withdrawal.",
    points: [
      "Fetches spend data without revealing too much to helpers",
      "Builds a STARK proof locally and wraps it for verification",
      "Publishes a nullifier so the same note cannot be spent twice"
    ]
  },
  recover: {
    number: "04",
    title: "Recover through encrypted archive data.",
    text: "The event server helps the desktop resync encrypted notes and nullifiers while plaintext note contents remain local to the user's device.",
    points: [
      "Useful when restoring from recovery material",
      "Downloads encrypted archive information and public nullifier history",
      "Rebuilds usable local state without making the server a custodian"
    ]
  }
};

const flowNumber = document.getElementById("flow-number");
const flowTitle = document.getElementById("flow-title");
const flowText = document.getElementById("flow-text");
const flowPoints = document.getElementById("flow-points");

document.querySelectorAll(".flow-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const data = flowData[button.dataset.flow];
    if (!data) return;

    document.querySelectorAll(".flow-tab").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    if (flowNumber) flowNumber.textContent = data.number;
    if (flowTitle) flowTitle.textContent = data.title;
    if (flowText) flowText.textContent = data.text;
    if (flowPoints) flowPoints.innerHTML = data.points.map((item) => `<li>${item}</li>`).join("");
  });
});

const infraData = {
  treepir: {
    title: "TreePIR Server",
    text: "Merkle-path lookup can leak which note a user is preparing to spend. TreePIR helps separate path retrieval from direct leaf disclosure, so the helper server is not simply handed the exact selected leaf index."
  },
  event: {
    title: "Event Server",
    text: "The event server mirrors encrypted note events, nullifiers, and sync state. It improves recovery and availability without needing plaintext note contents."
  },
  wrapper: {
    title: "Groth16 Wrapper",
    text: "The wrapper converts local RISC Zero receipts into the Groth16-compatible form used by the verifier stack. It helps with proof formatting, but it does not hold the user's local vault or secret note material."
  },
  vault: {
    title: "Desktop Vault",
    text: "The desktop vault protects Mixer Identity data, private notes, account state, and recovery material locally. This boundary matters because privacy can be lost long before a transaction reaches the chain."
  }
};

const infraTitle = document.getElementById("infra-title");
const infraText = document.getElementById("infra-text");

document.querySelectorAll(".infra-node").forEach((button) => {
  button.addEventListener("click", () => {
    const data = infraData[button.dataset.infra];
    if (!data) return;

    document.querySelectorAll(".infra-node").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    if (infraTitle) infraTitle.textContent = data.title;
    if (infraText) infraText.textContent = data.text;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

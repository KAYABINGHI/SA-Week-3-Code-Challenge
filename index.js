// Wait for DOM to be fully loaded before starting the program
document.addEventListener("DOMContentLoaded", main)

// Main function that starts the program logic
function main() {
  displayPosts()
  addNewPostListener()
}

// Update post count display
function updatePostCount() {
  const postCount = document.querySelectorAll("#post-list li").length
  document.getElementById("post-count").textContent = postCount
}

// Core Deliverable: Display all blog posts
async function displayPosts() {
  try {
    const response = await fetch("http://localhost:3000/posts")
    const posts = await response.json()
    const postList = document.querySelector("#post-list ul")
    postList.innerHTML = "" // Clear existing list

    posts.forEach((post) => {
      const li = document.createElement("li")
      li.textContent = post.title
      li.dataset.id = post.id
      li.addEventListener("click", () => handlePostClick(post.id))
      postList.appendChild(li)
    })

    updatePostCount()

    // Advanced Deliverable: Display first post details on page load
    if (posts.length > 0) {
      handlePostClick(posts[0].id)
    }
  } catch (error) {
    console.error("Error fetching posts:", error)
    // Fallback to show sample data if API is not available
    displaySamplePosts()
  }
}

// Fallback function to display sample posts when API is not available
function displaySamplePosts() {
  const samplePosts = [
    {
      id: 1,
      title: "Dub Through The Night",
      content:
        "As low as my eyes be I roll with the gangstas don't get foul with your mouth The wrong punchline'll have niggas inside of your house Nigga I'm doing good I made it out of the hood I own Beverly Hills no more bottles or wood.",
      author: "Green Lion Crew",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Higher Meds",
      content:
        "When Marcus Garvey a shown like storm Tеnor Saw buss when him ring the alarm Bob Marley shot thе sherrif so him cyaah simmer down Nuh make nuh politician take unuh fi clown",
      author: "Yaadcore",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Born To Be A Star",
      content:
        "Does fame in this game have to change who you are? Or could I be the same one who came from a far-away life Just to make it in these Broadway lights?Blogging is a fantastic way to share your thoughts and ideas with the world. This post will guide you through the basics of creating engaging content that resonates with your audience.",
      author: "Stranjah Miller",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop",
    },
  ]

  const postList = document.querySelector("#post-list ul")
  postList.innerHTML = ""

  samplePosts.forEach((post) => {
    const li = document.createElement("li")
    li.textContent = post.title
    li.dataset.id = post.id
    li.addEventListener("click", () => handlePostClickLocal(post))
    postList.appendChild(li)
  })

  updatePostCount()

  // Display first post details
  if (samplePosts.length > 0) {
    handlePostClickLocal(samplePosts[0])
  }

  // Store sample posts globally for local operations
  window.samplePosts = samplePosts
}

// Core Deliverable: Handle post click to show details
async function handlePostClick(id) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`)
    const post = await response.json()
    displayPostDetails(post)
    highlightActivePost(id)
    showPostActions(id)
  } catch (error) {
    console.error("Error fetching post details:", error)
  }
}

// Handle post click for local sample data
function handlePostClickLocal(post) {
  displayPostDetails(post)
  highlightActivePost(post.id)
  showPostActions(post.id)
}

// Display post details in the detail section
function displayPostDetails(post) {
  const postDetail = document.querySelector("#post-detail")
  postDetail.innerHTML = `
        ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ""}
        <h3>${post.title}</h3>
        <div class="post-meta">
            <span>👤 <strong>Author:</strong> ${post.author}</span>
            ${post.date ? `<span>📅 <strong>Date:</strong> ${post.date}</span>` : ""}
        </div>
        <p>${post.content}</p>
    `
}

// Highlight the active post in the list
function highlightActivePost(id) {
  document.querySelectorAll("#post-list li").forEach((li) => li.classList.remove("active"))
  const activePost = document.querySelector(`#post-list li[data-id="${id}"]`)
  if (activePost) {
    activePost.classList.add("active")
  }
}

// Show post actions (Edit/Delete buttons)
function showPostActions(id) {
  const actions = document.querySelector("#post-actions")
  actions.classList.remove("hidden")
  actions.dataset.id = id

  // Add event listeners for edit and delete buttons
  const editBtn = document.querySelector("#edit-post-btn")
  const deleteBtn = document.querySelector("#delete-post-btn")

  editBtn.onclick = () => handleEditClick()
  deleteBtn.onclick = () => handleDeleteClick()
}

// Core Deliverable: Add new post listener
function addNewPostListener() {
  const form = document.querySelector("#new-post-form")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const newPost = {
      title: form.title.value,
      content: form.content.value,
      author: form.author.value,
      image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=300&h=200&fit=crop`,
    }

    try {
      // Try to persist to API
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const savedPost = await response.json()
      addPostToList(savedPost)
      handlePostClick(savedPost.id)
    } catch (error) {
      console.error("Error adding post to API, adding locally:", error)
      // Fallback: add to local sample data
      const localPost = { ...newPost, id: Date.now() }
      if (window.samplePosts) {
        window.samplePosts.push(localPost)
      }
      addPostToList(localPost)
      handlePostClickLocal(localPost)
    }

    form.reset()
  })

  // Add edit form listeners
  setupEditFormListeners()
}

// Add post to the list in DOM
function addPostToList(post) {
  const li = document.createElement("li")
  li.textContent = post.title
  li.dataset.id = post.id
  li.addEventListener("click", () => {
    if (window.samplePosts) {
      handlePostClickLocal(post)
    } else {
      handlePostClick(post.id)
    }
  })
  document.querySelector("#post-list ul").appendChild(li)
  updatePostCount()
}

// Advanced Deliverable: Handle edit button click
async function handleEditClick() {
  const id = document.querySelector("#post-actions").dataset.id

  try {
    let post
    if (window.samplePosts) {
      post = window.samplePosts.find((p) => p.id == id)
    } else {
      const response = await fetch(`http://localhost:3000/posts/${id}`)
      post = await response.json()
    }

    const editForm = document.querySelector("#edit-post-form")
    editForm.querySelector("#edit-title").value = post.title
    editForm.querySelector("#edit-content").value = post.content
    editForm.dataset.id = id
    editForm.classList.remove("hidden")

    // Hide post actions while editing
    document.querySelector("#post-actions").classList.add("hidden")
  } catch (error) {
    console.error("Error fetching post for edit:", error)
  }
}

// Setup edit form event listeners
function setupEditFormListeners() {
  const editForm = document.querySelector("#edit-post-form")
  const cancelBtn = document.querySelector("#cancel-edit")

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const id = editForm.dataset.id
    const updatedPost = {
      title: editForm.querySelector("#edit-title").value,
      content: editForm.querySelector("#edit-content").value,
    }

    try {
      // Try to update via API
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      })

      // Update local display
      updatePostInList(id, updatedPost.title)
      handlePostClick(id)
    } catch (error) {
      console.error("Error updating post via API, updating locally:", error)
      // Fallback: update local sample data
      if (window.samplePosts) {
        const postIndex = window.samplePosts.findIndex((p) => p.id == id)
        if (postIndex !== -1) {
          window.samplePosts[postIndex] = { ...window.samplePosts[postIndex], ...updatedPost }
          updatePostInList(id, updatedPost.title)
          handlePostClickLocal(window.samplePosts[postIndex])
        }
      }
    }

    editForm.classList.add("hidden")
    document.querySelector("#post-actions").classList.remove("hidden")
  })

  cancelBtn.addEventListener("click", () => {
    editForm.classList.add("hidden")
    document.querySelector("#post-actions").classList.remove("hidden")
  })
}

// Update post title in the list
function updatePostInList(id, newTitle) {
  const li = document.querySelector(`#post-list li[data-id="${id}"]`)
  if (li) {
    li.textContent = newTitle
  }
}

// Advanced Deliverable: Handle delete button click
async function handleDeleteClick() {
  const id = document.querySelector("#post-actions").dataset.id

  if (confirm("Are you sure you want to delete this post?")) {
    try {
      // Try to delete via API
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("Error deleting post via API, deleting locally:", error)
      // Fallback: delete from local sample data
      if (window.samplePosts) {
        window.samplePosts = window.samplePosts.filter((p) => p.id != id)
      }
    }

    // Remove from DOM
    const li = document.querySelector(`#post-list li[data-id="${id}"]`)
    if (li) {
      li.remove()
    }

    updatePostCount()

    // Clear post detail and hide actions
    const postDetail = document.querySelector("#post-detail")
    postDetail.innerHTML = '<p class="placeholder">Select a post to view details</p>'
    document.querySelector("#post-actions").classList.add("hidden")

    // Display first remaining post if available
    const firstLi = document.querySelector("#post-list li")
    if (firstLi) {
      const firstId = firstLi.dataset.id
      if (window.samplePosts) {
        const firstPost = window.samplePosts.find((p) => p.id == firstId)
        if (firstPost) handlePostClickLocal(firstPost)
      } else {
        handlePostClick(firstId)
      }
    }
  }
}

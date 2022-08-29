# Documentation

## Layout Component

### How to use Layout Component

```
<Layout>
    code of respective page
</Layout>
```

Layout component have 4 props

- home
- bookmarks
- messages
- profile

Whatever page you want to create assign that prop true

examples.

### How to create home page using Layout Component

```
<Layout home={true}>
    code of Home page
</Layout>
```

### How to create bookmarks page using Layout Component

```
<Layout bookmarks={true}>
    code of bookmarks page
</Layout>
```

### How to create messages page using Layout Component

```
<Layout messages={true}>
    code of messages page
</Layout>
```

### How to create profile page using Layout Component

```
<Layout profile={true}>
    code of profile page
</Layout>
```

## Input Component

### How to use Layout Component

```
<Input />
```

Input component have 3 props

- placeholder
- onChange
- type
  - text (its default so don't need to assign)
  - password

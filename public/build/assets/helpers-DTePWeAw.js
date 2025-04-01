function r(t){return t?t.startsWith("http://")||t.startsWith("https://")?t:t.startsWith("storage/")?`/${t}`:t.startsWith("/storage/")?t:`/storage/${t}`:""}export{r as f};

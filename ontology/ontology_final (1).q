[QueryItem="1"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?d
WHERE {
?d a :Doctor 
}

[QueryItem="2"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# Get the user and the symptoms + severity they provided

SELECT DISTINCT ?user ?symp ?severity
WHERE {
?user :provides ?hc .
?hc :contains ?symp .
?hc :severity ?severity

}

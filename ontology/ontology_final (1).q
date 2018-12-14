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

[QueryItem="3"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# Get the user and the symptoms + severity they provided

SELECT DISTINCT ?user ?diseaseID ?departmentName ?hospitalName ?DoctorName
WHERE {
?user :has_disease ?diseaseID .
?department :is_specialized ?diseaseID.
?department :

}

[QueryItem="4"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# Get the user and the symptoms + severity they provided

SELECT DISTINCT ?user ?diseaseID ?departmentName
WHERE {
?user :has_disease ?diseaseID .
?department :is_specialized ?diseaseID .
?department :department_name ?departmentName .


}

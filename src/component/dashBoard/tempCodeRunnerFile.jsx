 <div className="themeBackground">
          {templates.map((template, index) => (
            <TempCard
              key={index}
              {...template}
              onSelect={handleTemplateSelect}
              selected={selectedTemplate === template}
            />
          ))}
        </div>